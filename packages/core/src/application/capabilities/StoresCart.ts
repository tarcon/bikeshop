import { Cart } from "../../index"

export interface StoresCart {
   store(cart: Cart): void
}
