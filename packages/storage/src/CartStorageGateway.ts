import {
   AddsCartBikes,
   Bike,
   Cart,
   LoadsCartBikes,
   RemovesCartBikes,
} from "@bikeshop/core"

export class CartStorageGateway
   implements AddsCartBikes, RemovesCartBikes, LoadsCartBikes {
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
