import { BikeStorage, StoredBike } from "./BikeStorage"
import { Bike, ProvidesBikes } from "@bikeshop/shop"

export class BikeStorageGateway implements ProvidesBikes {
   public fetchPurchasableBikes(): Promise<Array<Bike>> {
      return Promise.resolve(
         BikeStorage.StoredBikes.map(BikeStorageGateway.mapToBike)
      )
   }

   private static mapToBike(storedBike: StoredBike): Bike {
      return new Bike(
         storedBike.ean,
         storedBike.name,
         storedBike.price,
         storedBike.productImageFileName,
         storedBike.description
      )
   }
}
