import { RemoveBikeFromCartInput } from "./RemoveBikeFromCart.in"
import { RemoveBikeFromCartOutput } from "./RemoveBikeFromCart.out"
import { DisplaysCart } from "./interfaces/DisplaysCart"
import { LoadsCart } from "./interfaces/LoadsCart"
import { StoresCart } from "./interfaces/StoresCart"
import { Cart } from "../domain/Cart"

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
         cart.removeProductByEan(input.ean)
         this._cartStorage.store(cart)

         const output = RemoveBikeFromCart.createOutputFromCart(cart)
         this._ui.displayCart(output)
      } catch (e) {
         console.error("Could not remove bike with ean: " + input.ean, e)
      }
   }

   private static createOutputFromCart(cart: Cart): RemoveBikeFromCartOutput {
      return {
         bikes: cart.products.map((product) => {
            return {
               count: product.count,
               ean: product.ean,
               name: product.name,
               price: product.price,
            }
         }),
         totalPrice: RemoveBikeFromCart.calculateTotalPrice(cart),
      }
   }
   private static calculateTotalPrice(cart: Cart) {
      return cart.products.reduce<number>((sum, product) => {
         return sum + product.price * product.count
      }, 0)
   }
}
