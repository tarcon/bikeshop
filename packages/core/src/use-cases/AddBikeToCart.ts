import { AddBikeToCartOutput } from "./AddBikeToCart.out"
import { AddBikeToCartInput } from "./AddBikeToCart.in"
import {
   Cart,
   DisplaysCart,
   DisplaysError,
   LoadsCart,
   ProvidesBike,
   StoresCart,
} from ".."

export class AddBikeToCart {
   private _cartStorage: StoresCart & LoadsCart
   private _bikeBackend: ProvidesBike
   private _ui: DisplaysError & DisplaysCart

   constructor(
      bikeBackend: ProvidesBike,
      cartStorage: StoresCart & LoadsCart,
      ui: DisplaysError & DisplaysCart
   ) {
      this._cartStorage = cartStorage
      this._bikeBackend = bikeBackend
      this._ui = ui
   }

   async execute(bikeToAdd: AddBikeToCartInput): Promise<void> {
      try {
         const bike = await this._bikeBackend.fetchBikeByEAN(bikeToAdd.ean)

         const cart = this._cartStorage.load()
         cart.addProduct(bike)
         this._cartStorage.store(cart)

         const output = AddBikeToCart.createOutputFromCart(cart)
         this._ui.displayCart(output)
      } catch (e) {
         this._ui.displayError(e.message)
      }
   }

   private static createOutputFromCart(cart: Cart): AddBikeToCartOutput {
      return {
         bikes: cart.cartProducts.map((cartProduct) => {
            return {
               count: cartProduct.count,
               ean: cartProduct.ean,
               name: cartProduct.product.name,
               price: cartProduct.product.price,
            }
         }),
         totalPrice: AddBikeToCart.calculateTotalPrice(cart),
      }
   }

   private static calculateTotalPrice(cart: Cart) {
      return cart.products.reduce<number>((sum, product) => {
         return sum + product.price * cart.countProduct(product.ean)
      }, 0)
   }
}
