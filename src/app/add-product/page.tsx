import FormeSubmitButton from "@/components/FormeSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

// to change metadata specific for this page
export const metadata = {
    title: "Add Product - Flowmazoon"
}

async function addProduct(formData: FormData) {
    "use server";

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    if (!name || !description || !imageUrl || !price) {
        throw Error("Missing required fields");
    }

    await prisma.product.create({
        data: { name, description, imageUrl, price }
    })

    redirect("/");
}

export default function AddProductPage() {
    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">Add Products</h1>
            <form action={addProduct}>
                <input
                    required
                    name="name"
                    placeholder="Name"
                    className="input input-bordered mb-3 w-full"
                />
                <textarea
                    required
                    name="description"
                    placeholder="Description"
                    className="textarea textarea-bordered mb-3 w-full"
                />
                <input
                    required
                    name="imageUrl"
                    placeholder="Image URL"
                    type="url"
                    className="input input-bordered mb-3 w-full"
                />
                <input
                    required
                    name="price"
                    placeholder="Price"
                    type="number"
                    className="input input-bordered mb-3 w-full"
                />
                <FormeSubmitButton className="btn-block">Add Product</FormeSubmitButton>
            </form>
        </div>
    )
}