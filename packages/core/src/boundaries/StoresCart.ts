import { Bike } from ".."

export interface StoresCart {
   addBike(bike: Bike): void
   getBikes(): ReadonlyArray<Bike>
}

export interface LoadsCartBikes {
   getBikes(): ReadonlyArray<Bike>
}

export interface RemovesCartBikes {
   removeBikeByEan(ean: number): void
}
