import { Bike } from "../entities/Bike"

export interface StoresCart {
   addBike(bike: Bike): void
   getBikes(): ReadonlyArray<Bike>
}
