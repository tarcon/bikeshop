import { Bike, CartBikeOutput, DisplaysCart, LoadsCart, StoresCart } from ".."
import { RemoveBikeFromCartInput } from "./RemoveBikeFromCart.in"
import { RemoveBikeFromCartOutput } from "./RemoveBikeFromCart.out"

export class RemoveBikeFromCart {
   private _ui: DisplaysCart
   private _cartStorage: LoadsCart & StoresCart

   constructor(ui: DisplaysCart, cart: StoresCart & LoadsCart) {
      this._ui = ui
      this._cartStorage = cart
   }

   public execute(input: RemoveBikeFromCartInput): void {
      try {
         const cart = this._cartStorage.load()
         cart.removeBikeByEan(input.ean)
         this._cartStorage.store(cart)

         this._ui.displayCart(
            RemoveBikeFromCart.createOutputFromCart(cart.bikes)
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
         ean: bike.ean,
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
