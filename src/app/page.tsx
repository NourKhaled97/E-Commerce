import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  // we should name it like this because that how we can get the value from url in next js
  searchParams: { page: string }
}

export default async function Home({ searchParams: { page = "1" } }: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;
  // how many product I want to put in top
  const heroItemCount = 1;

  // get total number of product in database
  const totalItemCount = await prisma.product.count();

  // math.ciel to wrap the number 4.6 -> 5
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    // we modify here to take into consideration the pagination
    // we skip the currentPage -1 times the pagesize, and skip the heroItemCount too if page not == 0
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    // here we specify how many item to get
    take: pageSize + (currentPage === 1 ? heroItemCount : 0)
  })

  return (
    <div className="flex flex-col items-center">
      {currentPage === 1 &&
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold">{products[0].name}</h1>
              <p className="py-6">{products[0].description}</p>
              <Link href={"products/" + products[0].imageUrl //id

              }
                className="btn btn-primary">
                Check it out
              </Link>
            </div>
          </div>
        </div>
      }

      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard key={product.price} product={product as Product} />
        ))}
      </div>

      {totalPages > 1 && <PaginationBar currentPage={currentPage} totalPages={totalItemCount} />}

    </div>
  );
}
