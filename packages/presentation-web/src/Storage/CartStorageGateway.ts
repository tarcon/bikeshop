import { StoresCart } from "../Shop/boundaries/StoresCart"
import { Bike } from "../Shop/entities/Bike"

export class CartStorageGateway implements StoresCart {
   private _cart: Array<Bike> = []

   addBike(bike: Bike): void {
      this._cart.push(bike)
   }

   getBikes(): ReadonlyArray<Bike> {
      return Object.freeze([...this._cart])
   }
}
