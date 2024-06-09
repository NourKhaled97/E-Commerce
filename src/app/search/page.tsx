import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next";

interface SearchPageProps {
    searchParams: { query: string }
}

export async function generateMetadata({ searchParams: { query } }: SearchPageProps): Promise<Metadata> {
    return {
        title: `Search: ${query} - Flowmazoon`
    }
}

export default async function SearchPage({ searchParams: { query } }: SearchPageProps) {
    const products = await prisma.product.findMany({
        where: {
            OR: [
                // insensitive => no matter name contains upper case or loawer case, it will give me the result
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
            ]
        },
        orderBy: { id: "desc" }
    });

    if (products.length === 0) {
        return <div className="text-center">No products found</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    )
}