import {Bike} from "@bikeshop/shop";

export interface ProvidesBike {
   fetchBikeByEAN(ean: number): Promise<Bike>
}
