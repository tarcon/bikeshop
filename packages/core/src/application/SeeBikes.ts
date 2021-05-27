import { DisplaysBikes } from "./capabilities/DisplaysBikes"
import { ProvidesBikes } from "./capabilities/ProvidesBikes"
import { Bike } from "../domain/Bike"

export type PresentableBikes = Array<PresentableBike>
export type PresentableBike = {
   ean: number
   name: string
   price: number
   productImageFileName: string
   description: string
}

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
      this._ui.showBikes(presentableBikes)
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
