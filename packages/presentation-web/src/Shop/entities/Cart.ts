import { Bike } from "./Bike"

export class Cart {
   private _bikes: Array<Bike> = []

   public addBike(bike: Bike): void {
      this._bikes.push(bike)
   }

   get bikes(): Array<Bike> {
      return this._bikes
   }
}
