import { Bike } from ".."

export interface ProvidesBikes {
   fetchPurchasableBikes(): Promise<Array<Bike>>
}
