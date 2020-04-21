export type CartViewModel = {
   bikes: Array<CartBikeViewModel>
   totalPrice: string
}

export type CartBikeViewModel = {
   name: string
   price: string
}
