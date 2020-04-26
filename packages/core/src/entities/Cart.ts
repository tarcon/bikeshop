import { Bike } from "./Bike"

export class Cart {
   private _bikes: Array<Bike> = []

   public addBike(bike: Bike): void {
      this._bikes.push(bike)
   }

   get bikes(): Array<Bike> {
      return this._bikes
   }

   removeBikeByEan(ean: number) {
      this._bikes = this._bikes.filter((bike) => ean !== bike.ean)
   }
}
