export type AddBikeToCartOutput = {
   bikes: Array<CartBikeOutput>
   totalPrice: number
}

export type CartBikeOutput = {
   ean: number
   name: string
   price: number
}
