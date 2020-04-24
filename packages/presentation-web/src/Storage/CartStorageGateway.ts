import { Bike, Cart, StoresCart } from "@bikeshop/core"

export class CartStorageGateway implements StoresCart {
   private _cart: Cart

   constructor() {
      this._cart = new Cart();
   }

   addBike(bike: Bike): void {
      this._cart.addBike(bike)
   }

   getBikes(): ReadonlyArray<Bike> {
      return Object.freeze([...this._cart.bikes])
   }
}
