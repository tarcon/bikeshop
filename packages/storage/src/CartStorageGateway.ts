import { Bike, Cart, StoresCart } from "@bikeshop/core"
import { LoadsCartBikes, RemovesCartBikes } from "@bikeshop/core"

export class CartStorageGateway
   implements StoresCart, RemovesCartBikes, LoadsCartBikes {
   private _cart: Cart

   constructor() {
      this._cart = new Cart()
   }

   addBike(bike: Bike): void {
      this._cart.addBike(bike)
   }

   removeBikeByEan(ean: number): void {
      this._cart.removeBikeByEan(ean)
   }

   getBikes(): ReadonlyArray<Bike> {
      return Object.freeze([...this._cart.bikes])
   }
}
