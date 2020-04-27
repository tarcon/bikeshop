import {
   AddBikeToCartOutput,
   AddBikeToCartCartBikeOutput,
} from "./AddBikeToCart.out"
import { AddBikeToCartInput } from "./AddBikeToCart.in"
import {
   Bike,
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
         cart.addBike(bike)
         this._cartStorage.store(cart)

         const output = AddBikeToCart.createOutputFromCart(cart.bikes)
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

   private static mapCartBikeOutput(bike: Bike): AddBikeToCartCartBikeOutput {
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
