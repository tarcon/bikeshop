import { PresentableCart } from "../models/PresentableCart"

export interface DisplaysCart {
   displayCart(cartOutput: PresentableCart): void
}
