import { ProvidesBikes } from "../boundaries/ProvidesBikes"
import { DisplaysBikes } from "../boundaries/DisplaysBikes"
import { Bike } from "../entities/Bike"
import { SeeBikeOutput, SeeBikesOutput } from "./SeeBikesOutput"

export class SeeBikes {
   private _bikeBackend: ProvidesBikes
   private _ui: DisplaysBikes

   constructor(bikeBackend: ProvidesBikes, ui: DisplaysBikes) {
      this._bikeBackend = bikeBackend
      this._ui = ui
   }

   public async execute(): Promise<void> {
      const fetchedBikes = await this._bikeBackend.fetchPurchasableBikes()

      const bikesOutput = SeeBikes.mapToOutput(fetchedBikes)
      this._ui.showBikes(bikesOutput)
   }

   private static mapToOutput(bikes: Array<Bike>): SeeBikesOutput {
      return bikes.map(SeeBikes.mapBikeToBikeOutput)
   }

   private static mapBikeToBikeOutput(bike: Bike): SeeBikeOutput {
      return {
         ean: bike.ean,
         name: bike.name,
         price: bike.price,
         productImageFileName: bike.productImageFileName,
         description: bike.description,
      }
   }
}
