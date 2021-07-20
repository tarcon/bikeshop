import { CartViewModel } from "./CartViewModel"
import { AddBikeToCartOutput, DisplaysCart, DisplaysError } from "../index"

export class CartPresenter implements DisplaysCart, DisplaysError {

   constructor(private _renderFn: (viewModel: CartViewModel) => void) {}

   displayCart(cartOutput: AddBikeToCartOutput): void {
      const viewModel = CartPresenter.createCartViewModel(cartOutput)
      this._renderFn(viewModel)
   }

   displayError(error: string): void {
      console.error(error)
   }

   private static createCartViewModel(
      cartOutput: AddBikeToCartOutput
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
