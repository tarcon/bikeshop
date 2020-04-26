import { Bike } from "./Bike"

export class Cart {
   private _bikes: ReadonlyArray<Bike> = []

   public addBike(bike: Bike): void {
      this._bikes = [...this._bikes, bike]
   }

   get bikes(): ReadonlyArray<Bike> {
      return this._bikes
   }

   removeBikeByEan(ean: number) {
      this._bikes = this._bikes.filter((bike) => ean !== bike.ean)
   }
}
