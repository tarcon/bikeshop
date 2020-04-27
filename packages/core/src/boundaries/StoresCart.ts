import { Bike, Cart } from ".."

export interface AddsCartBikes {
   addBike(bike: Bike): void
}

export interface LoadsCartBikes {
   getBikes(): ReadonlyArray<Bike>
}

export interface RemovesCartBikes {
   removeBikeByEan(ean: number): void
}

export interface StoresCart {
   store(cart: Cart): void
}

export interface LoadsCart {
   load(): Cart
}
