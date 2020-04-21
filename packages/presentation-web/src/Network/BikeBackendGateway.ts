import { ProvidesBikes } from "../Shop/boundaries/ProvidesBikes"
import { Bike } from "../Shop/entities/Bike"
import { StoredBikeDto } from "./dto/StoredBikeDto"
import { ProvidesBike } from "../Shop/boundaries/ProvidesBike"

export class BikeBackendGateway implements ProvidesBikes, ProvidesBike {
   async fetchPurchasableBikes(): Promise<Array<Bike>> {
      const storedBikes = await fetch("http://api.bikeshop.de/bikes")
      return storedBikes.map(BikeBackendGateway.mapToBike)
   }

   async fetchBikeByEAN(ean: number): Promise<Bike> {
      const storedBike = await fetch("http://api.bikeshop.de/bike/", ean)
      const bike = BikeBackendGateway.mapToBike(storedBike)
      return Promise.resolve(bike)
   }

   private static mapToBike(dto: StoredBikeDto) {
      return new Bike(
         dto.ean,
         dto.name,
         dto.price,
         dto.productImageFileName,
         dto.description
      )
   }
}

//overwrite fetch() with a hardcoded response because we don't have a real backend
function fetch(url: string, ean?: number): Promise<any> {
   const data: any = {
      "http://api.bikeshop.de/bikes": fetchBikesData(),
      "http://api.bikeshop.de/bike/": ean ? fetchBikeData(ean) : () => {},
   }

   return new Promise(resolve => {
      setTimeout(() => {
         resolve(data[url])
      }, Math.random() * 1000)
   })
}

function fetchBikesData(): Array<StoredBikeDto> {
   return [
      {
         ean: 123908123,
         name: "Carbono R3",
         price: 4499,
         productImageFileName: "carbono.jpg",
         description:
            "A racing bike with a long heritage of classic race wins. Prefered by dentists.",
      },
      {
         ean: 235235235,
         name: "Generalized Asphalt G-Works",
         price: 7999,
         productImageFileName: "gworks.jpg",
         description:
            "An even racier bike used by most of the professional riders. Made in china, but priced like artisan work from the USA.",
      },
      {
         ean: 435643357,
         name: "Dungeon Ultra SLX",
         price: 5699,
         productImageFileName: "dungeon.jpg",
         description: "German engineered racing bike with nice looks.",
      },
   ]
}

function fetchBikeData(ean: number): StoredBikeDto {
   return fetchBikesData().filter(bike => bike.ean === ean)[0]
}
