import { Bike } from "../../index"

export interface ProvidesBike {
   fetchBikeByEAN(ean: number): Promise<Bike>
}
