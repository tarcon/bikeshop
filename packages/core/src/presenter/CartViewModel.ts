export type CartViewModel = {
   bikes: Array<{
      count: number
      ean: number
      name: string
      price: string
   }>
   totalPrice: string
}
