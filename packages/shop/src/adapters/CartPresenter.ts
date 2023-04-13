import { CartViewModel } from "./CartViewModel"
import { DisplaysCart } from "../application/interfaces/DisplaysCart"
import { DisplaysError } from "../application/interfaces/DisplaysError"
import { PresentableCart } from "../application/models/PresentableCart"

export class CartPresenter implements DisplaysCart, DisplaysError {
   constructor(private _renderFn: (viewModel: CartViewModel) => void) {}

   displayCart(cartOutput: PresentableCart): void {
      const viewModel = CartPresenter.createCartViewModel(cartOutput)
      this._renderFn(viewModel)
   }

   displayError(error: string): void {
      console.error(error)
   }

   private static createCartViewModel(
      cartOutput: PresentableCart
   ): CartViewModel {
      return {
         bikes: cartOutput.bikes.map((cartBike) => ({
            count: cartBike.count,
            ean: cartBike.ean,
            name: cartBike.name,
            price: CartPresenter.formatGermanPrice(cartBike.price),
         })),
         totalPrice: CartPresenter.formatGermanPrice(cartOutput.totalPrice),
      }
   }

   private static formatGermanPrice(price: number) {
      return price.toLocaleString("de-DE", {
         style: "currency",
         currency: "EUR",
      })
   }
}
