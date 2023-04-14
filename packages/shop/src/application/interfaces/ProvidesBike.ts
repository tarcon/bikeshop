import { Bike } from "../../domain/Bike"

export interface ProvidesBike {
   fetchBikeByEAN(ean: number): Promise<Bike>
}
