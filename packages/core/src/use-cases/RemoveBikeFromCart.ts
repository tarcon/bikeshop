import { DisplaysCart, LoadsCart, StoresCart, Cart } from ".."
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
         bikes: cart.cartProducts.map((cartProduct) => {
            return {
               count: cartProduct.count,
               ean: cartProduct.ean,
               name: cartProduct.product.name,
               price: cartProduct.product.price,
            }
         }),
         totalPrice: RemoveBikeFromCart.calculateTotalPrice(cart),
      }
   }
   private static calculateTotalPrice(cart: Cart) {
      return cart.cartProducts.reduce<number>((sum, cartProduct) => {
         return sum + cartProduct.product.price * cartProduct.count
      }, 0)
   }
}
