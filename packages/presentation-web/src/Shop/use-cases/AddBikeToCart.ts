import { AddBikeToCartInput } from "./AddBikeToCartInput"
import { StoresCart } from "../boundaries/StoresCart"
import { ProvidesBike } from "../boundaries/ProvidesBike"
import { DisplaysError } from "../boundaries/DisplaysError"
import { DisplaysCart } from "../boundaries/DisplaysCart"
import { Bike } from "../entities/Bike"
import { AddBikeToCartOutput, CartBikeOutput } from "./AddBikeToCartOutput"

export class AddBikeToCart {
   private _cartStorage: StoresCart
   private _bikeBackend: ProvidesBike
   private _ui: DisplaysError & DisplaysCart

   constructor(
      bikeBackend: ProvidesBike,
      cartStorage: StoresCart,
      ui: DisplaysError & DisplaysCart
   ) {
      this._cartStorage = cartStorage
      this._bikeBackend = bikeBackend
      this._ui = ui
   }

   async execute(bikeToAdd: AddBikeToCartInput): Promise<void> {
      try {
         const bike = await this._bikeBackend.fetchBikeByEAN(bikeToAdd.ean)
         this._cartStorage.addBike(bike)

         const allBikesInCart = this._cartStorage.getBikes()
         const output = AddBikeToCart.createOutputFromCart(allBikesInCart)
         this._ui.displayCart(output)
      } catch (e) {
         this._ui.displayError(e.message)
      }
   }

   private static createOutputFromCart(
      cartBikes: ReadonlyArray<Bike>
   ): AddBikeToCartOutput {
      return {
         bikes: cartBikes.map(AddBikeToCart.mapCartBikeOutput),
         totalPrice: AddBikeToCart.calculateTotalPrice(cartBikes),
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
