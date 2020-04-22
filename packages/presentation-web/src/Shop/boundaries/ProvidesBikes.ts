import {Bike} from "@bikeshop/shop";

export interface ProvidesBikes {
   fetchPurchasableBikes(): Promise<Array<Bike>>
}
