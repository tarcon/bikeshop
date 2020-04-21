import { SeeBikes } from "./SeeBikes"
import { DisplaysBikes } from "../boundaries/DisplaysBikes"
import { ProvidesBikes } from "../boundaries/ProvidesBikes"
import { aBike } from "../entities/BikeProvisioning"

describe("SeeBikes use case", () => {
   let backendWithoutBikes: ProvidesBikes
   let backendWithABike: ProvidesBikes
   let ui: DisplaysBikes

   it("can be executed", () => {
      const useCase = new SeeBikes(backendWithoutBikes, ui)

      expect(() => {
         useCase.execute()
      }).not.toThrow()
   })

   it("outputs no bikes to the presenter for an empty Storage", async () => {
      const useCase = new SeeBikes(backendWithoutBikes, ui)

      await useCase.execute()

      expect(ui.showBikes).toHaveBeenCalled()
      expect(ui.showBikes).toHaveBeenCalledWith([])
   })

   it("outputs bikes to the presenter", async () => {
      const useCase = new SeeBikes(backendWithABike, ui)

      await useCase.execute()

      expect(ui.showBikes).toHaveBeenCalled()
      expect(ui.showBikes).toHaveBeenCalledWith([
         {
            ean: 123,
            name: "Bike",
            price: 1000,
            productImageFileName: "pic.jpg",
            description: "nice Bike",
         },
      ])
   })

   beforeEach(() => {
      jest.resetAllMocks()

      backendWithoutBikes = {
         fetchPurchasableBikes: jest.fn().mockReturnValue([]),
      }

      backendWithABike = {
         fetchPurchasableBikes: jest.fn().mockReturnValue([aBike()]),
      }

      ui = {
         showBikes: jest.fn(),
      }
   })
})
