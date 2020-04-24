import { Bike } from ".."

export interface StoresCart {
   addBike(bike: Bike): void
   getBikes(): ReadonlyArray<Bike>
}
