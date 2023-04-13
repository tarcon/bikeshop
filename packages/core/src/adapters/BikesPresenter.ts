import { BikesViewModel } from "./BikesViewModel"
import { DisplaysBikes } from "../application/interfaces/DisplaysBikes"
import { PresentableBikes } from "../application/models/PresentableBikes"

export class BikesPresenter implements DisplaysBikes {
   private _renderFn: (viewModel: any) => void

   constructor(renderFn: (viewModel: BikesViewModel) => void) {
      this._renderFn = renderFn
   }

   public displayBikes(presentableBikes: PresentableBikes) {
      const viewModel = BikesPresenter.createBikesViewModel(presentableBikes)
      this._renderFn(viewModel)
   }

   private static createBikesViewModel(presentableBikes: PresentableBikes) {
      return presentableBikes.map((bike) => ({
         ean: bike.ean,
         name: bike.name,
         price: bike.price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
         }),
         productImageFileName: bike.productImageFileName,
         description: bike.description,
      }))
   }
}
