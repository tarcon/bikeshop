import { DisplaysBikes } from "./interfaces/DisplaysBikes"
import { ProvidesBikes } from "./interfaces/ProvidesBikes"
import { Bike } from "../domain/Bike"
import { PresentableBike, PresentableBikes } from "./models/PresentableBikes"
import { DisplaysLoading } from "./interfaces/DisplaysLoading"

export class SeeBikes {
   constructor(
      private readonly _bikeBackend: ProvidesBikes,
      private readonly _ui: DisplaysBikes & DisplaysLoading
   ) {}

   public async execute(): Promise<void> {
      this._ui.startLoading()
      const fetchedBikes = await this._bikeBackend.fetchPurchasableBikes()

      const presentableBikes = SeeBikes.createPresentableBikes(fetchedBikes)
      this._ui.displayBikes(presentableBikes)
      this._ui.finishLoading()
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
