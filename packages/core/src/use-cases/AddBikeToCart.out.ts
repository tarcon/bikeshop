export type AddBikeToCartOutput = {
   bikes: Array<AddBikeToCartCartBikeOutput>
   totalPrice: number
}

export type AddBikeToCartCartBikeOutput = {
   ean: number
   name: string
   price: number
}
