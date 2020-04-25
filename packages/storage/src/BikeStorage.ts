export type StoredBike = {
   ean: number
   name: string
   price: number
   productImageFileName: string
   description: string
}

export class BikeStorage {
   public static StoredBikes: Array<StoredBike> = [
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
