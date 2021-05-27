export type RemoveBikeFromCartOutput = {
   bikes: Array<{
      count: number
      ean: number
      name: string
      price: number
   }>
   totalPrice: number
}
