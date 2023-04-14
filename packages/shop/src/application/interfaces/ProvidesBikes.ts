import { Bike } from "../../domain/Bike"

export interface ProvidesBikes {
   fetchPurchasableBikes(): Promise<Array<Bike>>
}
