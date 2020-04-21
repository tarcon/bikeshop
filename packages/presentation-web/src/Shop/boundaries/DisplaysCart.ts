import { AddBikeToCartOutput } from "../use-cases/AddBikeToCartOutput"

export interface DisplaysCart {
   displayCart(cartOutput: AddBikeToCartOutput): void
}
