export type AddBikeToCartOutput = {
   bikes: Array<AddBikeToCartCartBikeOutput>
   totalPrice: number
}

export type AddBikeToCartCartBikeOutput = {
   count: number
   ean: number
   name: string
   price: number
}
