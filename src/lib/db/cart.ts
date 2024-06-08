// this is not server avtion, this is just function, so we son't need to add use server on the top

import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Cart, Prisma } from "@prisma/client";

export type CartWithProduct=Prisma.CartGetPayload<{
    include: {items: {include: {product: true} } }
}>

export type CartItemWithProduct=Prisma.CardItemGetPayload<{
    include: { product: true }
}>

export type ShoppingCart=CartWithProduct&{
    size:number,
    subtotal:number,
}

export async function getCart():Promise<ShoppingCart|null> {
    const localCartId=cookies().get("localCartId")?.value;
    const cart=localCartId? await prisma.cart.findUnique({
        where:{id:localCartId},
        include:{items:{include:{product:true}}}
    }):null;
    //include:{items:{include:{product:true}}}
    //to make join between cart and cartItem tables and get cartItems data

    if(!cart){
        return null;
    }

    return{
        ...cart,
        size:cart.items.reduce((acc,item)=> acc+item.quantity,0),
        subtotal:cart.items.reduce(
            (acc,item)=> acc+item.quantity * item.product.price,0
        ),

    }
    // reduce is javascript function that calculate the accumulate
    // read more about it please
}

export async function createCart():Promise<ShoppingCart> {
    const newCart=await prisma.cart.create({
        data:{}
    })
    
    // we shoud save the id of the cart in a cookie for the user 
    // Note: needs encryption + secure settings in real production app
    cookies().set("localCartId",newCart.id);
    return{
        ...newCart,
        items:[],
        size:0,
        subtotal:0
    }
}