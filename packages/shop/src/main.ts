import { Controller } from "./adapters/input/Controller"
import { AddBikeToCart } from "./application/AddBikeToCart"
import { CartStorageGateway } from "./adapters/CartStorageGateway"
import { BikeBackendGateway } from "./adapters/BikeBackendGateway"
import { RemoveBikeFromCart } from "./application/RemoveBikeFromCart"
import { SeeWelcome } from "./application/SeeWelcome"
import { SeeBikes } from "./application/SeeBikes"
import { ViewModel } from "./adapters/output/ViewModel"
import { ShopPresenter } from "./adapters/output/ShopPresenter"

export const UseCaseDefinitions = {
   AddBikeToCart: AddBikeToCart,
   SeeWelcome: SeeWelcome,
   SeeBikes: SeeBikes,
   RemoveBikeFromCart: RemoveBikeFromCart,
}

export type Plugins = {
   renderFn: (shopViewModel: Readonly<ViewModel>) => void
}

export function main(plugins: Plugins) {
   const cartStorage = new CartStorageGateway()
   const bikeBackend = new BikeBackendGateway()
   const shopPresenter = new ShopPresenter(plugins.renderFn)

   const useCases = {
      AddBikeToCart: new UseCaseDefinitions.AddBikeToCart(
         bikeBackend,
         cartStorage,
         shopPresenter
      ),
      SeeWelcome: new UseCaseDefinitions.SeeWelcome(shopPresenter),
      SeeBikes: new UseCaseDefinitions.SeeBikes(bikeBackend, shopPresenter),
      RemoveBikeFromCart: new UseCaseDefinitions.RemoveBikeFromCart(
         shopPresenter,
         cartStorage
      ),
   }

   const controller = new Controller(useCases)

   return { controller }
}
