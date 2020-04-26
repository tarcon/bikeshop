import {
   Bike,
   CartBikeOutput,
   DisplaysCart,
   LoadsCartBikes,
   RemovesCartBikes,
} from ".."
import { RemoveBikeFromCartInput } from "./RemoveBikeFromCart.in"
import { RemoveBikeFromCartOutput } from "./RemoveBikeFromCart.out"

export class RemoveBikeFromCart {
   private _ui: DisplaysCart
   private _cart: RemovesCartBikes & LoadsCartBikes

   constructor(ui: DisplaysCart, cart: RemovesCartBikes & LoadsCartBikes) {
      this._ui = ui
      this._cart = cart
   }

   public execute(input: RemoveBikeFromCartInput): void {
      try {
         this._cart.removeBikeByEan(input.ean)
         this._ui.displayCart(
            RemoveBikeFromCart.createOutputFromCart(this._cart.getBikes())
         )
      } catch (e) {
         console.error("Could not remove bike with ean: " + input.ean)
      }
   }

   private static createOutputFromCart(
      cartBikes: ReadonlyArray<Bike>
   ): RemoveBikeFromCartOutput {
      return {
         bikes: cartBikes.map(RemoveBikeFromCart.mapCartBikeOutput),
         totalPrice: RemoveBikeFromCart.calculateTotalPrice(cartBikes),
      }
   }

   private static mapCartBikeOutput(bike: Bike): CartBikeOutput {
      return {
         name: bike.name,
         price: bike.price,
      }
   }

   private static calculateTotalPrice(cartBikes: ReadonlyArray<Bike>) {
      return cartBikes.reduce<number>((sum, bike) => {
         return sum + bike.price
      }, 0)
   }
}
