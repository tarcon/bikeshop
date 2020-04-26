import { Bike } from ".."

export interface AddsCartBikes {
   addBike(bike: Bike): void
}

export interface LoadsCartBikes {
   getBikes(): ReadonlyArray<Bike>
}

export interface RemovesCartBikes {
   removeBikeByEan(ean: number): void
}
