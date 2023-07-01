import { DisplaysCart } from "./interfaces/DisplaysCart"
import { LoadsCart } from "./interfaces/LoadsCart"
import { ProvidesBike } from "./interfaces/ProvidesBike"
import { StoresCart } from "./interfaces/StoresCart"
import { DisplaysError } from "./interfaces/DisplaysError"
import { Cart } from "../domain/Cart"
import { PresentableCart } from "./models/PresentableCart"
import { AddBikeToCartInput } from "./AddBikeToCart.input"
import { AbstractUseCase } from "./UseCase"
import { DisplaysLoading } from "./interfaces/DisplaysLoading"

export class AddBikeToCart extends AbstractUseCase {
   constructor(
      private _bikeBackend: ProvidesBike,
      private _cartStorage: StoresCart & LoadsCart,
      private _ui: DisplaysError & DisplaysCart & DisplaysLoading
   ) {
      super()
   }

   async execute(bikeToAdd: AddBikeToCartInput) {
      try {
         this._ui.startLoading()
         const bike = await this._bikeBackend.fetchBikeByEAN(bikeToAdd.ean)

         const cart = this._cartStorage.load()
         cart.addProduct(bike)
         this._cartStorage.store(cart)

         const presentableCart = AddBikeToCart.createPresentableCart(cart)
         this._ui.displayCart(presentableCart)
         this._ui.finishLoading()
      } catch (e: any) {
         this._ui.displayError(e?.message)
      }
   }

   private static createPresentableCart(cart: Cart): PresentableCart {
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
