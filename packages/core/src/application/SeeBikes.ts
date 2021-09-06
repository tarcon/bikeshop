import { DisplaysBikes } from "./interfaces/DisplaysBikes"
import { ProvidesBikes } from "./interfaces/ProvidesBikes"
import { Bike } from "../domain/Bike"
import { PresentableBike, PresentableBikes } from "./models/PresentableBikes"

export class SeeBikes {
   private _bikeBackend: ProvidesBikes
   private _ui: DisplaysBikes

   constructor(bikeBackend: ProvidesBikes, ui: DisplaysBikes) {
      this._bikeBackend = bikeBackend
      this._ui = ui
   }

   public async execute(): Promise<void> {
      const fetchedBikes = await this._bikeBackend.fetchPurchasableBikes()

      const presentableBikes = SeeBikes.createPresentableBikes(fetchedBikes)
      this._ui.displayBikes(presentableBikes)
   }

   private static createPresentableBikes(bikes: Array<Bike>): PresentableBikes {
      return bikes.map(SeeBikes.createPresentableBike)
   }

   private static createPresentableBike(bike: Bike): PresentableBike {
      return {
         ean: bike.ean,
         name: bike.name,
         price: bike.price,
         productImageFileName: bike.productImageFileName,
         description: bike.description,
      }
   }
}
