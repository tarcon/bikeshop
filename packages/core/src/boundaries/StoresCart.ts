import { Cart } from ".."

export interface StoresCart {
   store(cart: Cart): void
}

export interface LoadsCart {
   load(): Cart
}
