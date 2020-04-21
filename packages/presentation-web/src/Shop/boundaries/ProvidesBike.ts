import { Bike } from "../entities/Bike"

export interface ProvidesBike {
   fetchBikeByEAN(ean: number): Promise<Bike>
}
