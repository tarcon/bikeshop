import { Bike } from ".."

export interface ProvidesBike {
   fetchBikeByEAN(ean: number): Promise<Bike>
}
