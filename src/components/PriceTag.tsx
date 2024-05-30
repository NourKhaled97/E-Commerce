import { formatPrice } from "@/lib/formatPrice"

interface PriceTag {
    price: number,
    className?: string
}

export default function PriceTag({ price, className }: PriceTag) {
    return (
        <span className={`badge ${className}`}>
            {formatPrice(price)}
        </span>
    )
}