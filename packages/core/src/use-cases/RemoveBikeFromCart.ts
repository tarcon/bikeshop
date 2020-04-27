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

         this._ui.displayCart(RemoveBikeFromCart.createOutputFromCart(cart))
      } catch (e) {
         console.error("Could not remove bike with ean: " + input.ean)
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
      return cart.products.reduce<number>((sum, bike) => {
         return sum + bike.price
      }, 0)
   }
}
