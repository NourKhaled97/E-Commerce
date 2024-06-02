import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

interface productPageProps {
    // params will contain the id of product [id]
    params: {
        id: string,
    }
}

// to cache the value returned from prisma
// this is only executed once and data is used in both functions
const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) notFound();

    return product;
})

// to set the metadata (denamically)
// add promise because it is async function, 
// we put it async function because we fetch design product from database in order to get name of product and description
export async function generateMetadata({ params: { id } }: productPageProps): Promise<Metadata> {
    // we use fetch data to fetch the data once and cach it 
    const product = await getProduct(id);

    return {
        title: product.name + " - Flowmazoon",
        description: product.description,
        openGraph: {
            images: [{ url: product.imageUrl }],
        }
    }
}

export default async function ProductPage({ params: { id } }: productPageProps) {
    // we get from here the data from cache
    const product = await getProduct(id)

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg"
                priority
            />

            <div>
                <h1 className="text-5xl font-bold">{product.name}</h1>
                <PriceTag price={product.price} className="mt-4" />
                <p className="py-6">{product.description}</p>
            </div>
        </div>
    )
}