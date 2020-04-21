export type AddBikeToCartOutput = {
   bikes: Array<CartBikeOutput>
   totalPrice: number
}

export type CartBikeOutput = {
   name: string
   price: number
}
