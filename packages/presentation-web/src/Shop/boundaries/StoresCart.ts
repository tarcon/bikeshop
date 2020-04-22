import {Bike} from "@bikeshop/shop";

export interface StoresCart {
   addBike(bike: Bike): void
   getBikes(): ReadonlyArray<Bike>
}
