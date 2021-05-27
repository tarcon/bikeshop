import { Bike } from "../../index"

export interface ProvidesBikes {
   fetchPurchasableBikes(): Promise<Array<Bike>>
}
