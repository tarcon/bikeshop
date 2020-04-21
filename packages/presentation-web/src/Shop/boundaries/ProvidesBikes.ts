import { Bike } from "../entities/Bike"

export interface ProvidesBikes {
   fetchPurchasableBikes(): Promise<Array<Bike>>
}
