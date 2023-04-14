import { Cart } from "../../domain/Cart"

export interface StoresCart {
   store(cart: Cart): void
}
