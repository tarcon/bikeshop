import { AddBikeToCartOutput } from "./AddBikeToCart.out"
import { AddBikeToCartInput } from "./AddBikeToCart.in"
import { DisplaysCart } from "./interfaces/DisplaysCart"
import { LoadsCart } from "./interfaces/LoadsCart"
import { ProvidesBike } from "./interfaces/ProvidesBike"
import { StoresCart } from "./interfaces/StoresCart"
import { DisplaysError } from "./interfaces/DisplaysError"
import { Cart } from "../domain/Cart"

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

         const presentableCart = AddBikeToCart.createPresentableCart(cart)
         this._ui.displayCart(presentableCart)
      } catch (e) {
         this._ui.displayError(e.message)
      }
   }

   private static createPresentableCart(cart: Cart): AddBikeToCartOutput {
      return {
         bikes: cart.products.map((product) => {
            return {
               count: product.count,
               ean: product.ean,
               name: product.name,
               price: product.price,
            }
         }),
         totalPrice: AddBikeToCart.calculateTotalPrice(cart),
      }
   }

   private static calculateTotalPrice(cart: Cart) {
      return cart.products.reduce<number>((sum, product) => {
         return sum + product.price * product.count
      }, 0)
   }
}
