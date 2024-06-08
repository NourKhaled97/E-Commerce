import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/formatPrice";

export const metadata = {
    title: "Your Cart - Flowmazoon",
}

export default async function CartPage() {
    // we get from here the data from cache
    const cart = await getCart();

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <h1 className="text-3xl font-bold mb-6">
                Shopping Cart
            </h1>
            {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity} />
            ))}
            {!cart?.items.length && <p>Your cart is empty!</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Total: {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[200px]">Checkout</button>
            </div>
        </div>
    )
}