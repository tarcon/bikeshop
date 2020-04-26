export type RemoveBikeFromCartOutput = {
   bikes: Array<{
      ean: number
      name: string
      price: number
   }>
   totalPrice: number
}
