"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId:string) {
    // "??" means the right side will be executed if the left side gives or undefined null
    const cart=(await getCart())?? (await createCart());

    const articalInCart=cart.items.find(item=>item.productId===productId);

    if(articalInCart){
        // to update the cartItem in database
        await prisma.cardItem.update({
            where:{id:articalInCart.id},
            data:{quantity:{increment:1}}
        })
    }else{
        await prisma.cardItem.create({
            data:{
                cardId:cart.id,
                productId,
                quantity:1,
            }
        })
    }

    revalidatePath("/products/[id]");
}