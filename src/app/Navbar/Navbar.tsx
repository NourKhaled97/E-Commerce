import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";

// server action
// if we don't use this function and just redirect inside the action of the form then the page 
// will reload and that not what we want here
async function searchProdut(formData: FormData) {
    "use server";

    // to get the data from input field of name searchQuery
    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
        // "?" means the params of this page (url)
        redirect("/search?query=" + searchQuery);
    }
}

export default async function Navbar() {
    const cart = await getCart();

    return (
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href={"/"} className="btn btn-ghost text-xl normal-case">
                        <Image
                            src={logo}
                            height={40}
                            width={40}
                            alt="Flowmazon logo" />
                        Flowmazon
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchProdut}>
                        <div className="form-control">
                            <input
                                name="searchQuery"
                                placeholder="Search"
                                className="input input-bordered w-full min-w-[100px]"
                            />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart} />
                </div>
            </div>
        </div>
    )
}