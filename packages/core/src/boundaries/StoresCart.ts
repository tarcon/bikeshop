import { Cart } from ".."

export interface StoresCart {
   store(cart: Cart): void
}
