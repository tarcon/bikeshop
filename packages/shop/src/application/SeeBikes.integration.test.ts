import { aBike } from "../domain/Bike.fixture"
import { SeeBikes } from "./SeeBikes"
import { ProvidesBikes } from "./interfaces/ProvidesBikes"
import { ShopPresenter } from "../adapters/output/ShopPresenter"

describe("SeeBikes use case", () => {
   let renderSpy = jest.fn()
   let presenter: ShopPresenter

   beforeEach(() => {
      jest.clearAllMocks()
      presenter = new ShopPresenter(renderSpy)
   })

   let backendWithoutBikes: ProvidesBikes = {
      fetchPurchasableBikes: jest.fn().mockReturnValue([]),
   }

   let backendWithABike: ProvidesBikes = {
      fetchPurchasableBikes: jest.fn().mockReturnValue([aBike()]),
   }

   beforeEach(() => {
      jest.clearAllMocks()
   })

   it("can be executed", async () => {
      const useCase = new SeeBikes(backendWithoutBikes, presenter)

      await expect(() => useCase.execute()).not.toThrow()
   })

   it("outputs no bikes to the presenter for an empty Storage", async () => {
      const useCase = new SeeBikes(backendWithoutBikes, presenter)

      await useCase.execute()

      expect(renderSpy.mock.calls).toStrictEqual([
         [
            {
               global: {
                  isLoading: true,
               },
            },
         ],
         [
            {
               global: {
                  isLoading: true,
               },
               bikesPage: {
                  bikes: [],
               },
            },
         ],
         [
            {
               global: {
                  isLoading: false,
               },
               bikesPage: {
                  bikes: [],
               },
            },
         ],
      ])
   })

   it("outputs bikes to the presenter", async () => {
      const useCase = new SeeBikes(backendWithABike, presenter)

      await useCase.execute()

      expect(renderSpy.mock.calls).toStrictEqual([
         [
            {
               global: {
                  isLoading: true,
               },
            },
         ],
         [
            {
               global: {
                  isLoading: true,
               },
               bikesPage: {
                  bikes: [
                     {
                        description: "nice Bike",
                        ean: 123,
                        name: "Bike",
                        price: "1.000,00 €",
                        productImageFileName: "pic.jpg",
                     },
                  ],
               },
            },
         ],
         [
            {
               global: {
                  isLoading: false,
               },
               bikesPage: {
                  bikes: [
                     {
                        description: "nice Bike",
                        ean: 123,
                        name: "Bike",
                        price: "1.000,00 €",
                        productImageFileName: "pic.jpg",
                     },
                  ],
               },
            },
         ],
      ])
   })
})
