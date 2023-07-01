import { AddBikeToCart } from "./AddBikeToCart"
import { CartStorageGateway } from "../adapters/CartStorageGateway"
import { BikeBackendGateway } from "../adapters/BikeBackendGateway"
import { ShopPresenter } from "../adapters/output/ShopPresenter"

describe("AddBikeToCart", () => {
   let renderSpy = jest.fn()
   let presenter

   beforeEach(() => {
      jest.clearAllMocks()
      presenter = new ShopPresenter(renderSpy)
   })

   it("displays the shopping cart with two bikes of the same kind", async () => {
      const backend = new BikeBackendGateway()
      const cart = new CartStorageGateway()
      const useCase = new AddBikeToCart(backend, cart, presenter)

      const bikeToAdd = {
         ean: 123908123,
      }

      await useCase.execute(bikeToAdd)

      const expectedRendersForFirstAddedBike = [
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
               aside: {
                  cart: {
                     bikes: [
                        {
                           count: 1,
                           ean: 123908123,
                           name: "Carbono R3",
                           price: "1.000,00 €",
                        },
                     ],
                     totalPrice: "1.000,00 €",
                  },
               },
            },
         ],
         [
            {
               global: {
                  isLoading: false,
               },
               aside: {
                  cart: {
                     bikes: [
                        {
                           count: 1,
                           ean: 123908123,
                           name: "Carbono R3",
                           price: "1.000,00 €",
                        },
                     ],
                     totalPrice: "1.000,00 €",
                  },
               },
            },
         ],
      ]
      expect(renderSpy.mock.calls).toStrictEqual([
         ...expectedRendersForFirstAddedBike,
      ])

      //when adding another bike
      await useCase.execute(bikeToAdd)

      const expextedRendersForSecondAddedBike = [
         [
            {
               global: {
                  isLoading: true,
               },
               aside: {
                  cart: {
                     bikes: [
                        {
                           count: 1,
                           ean: 123908123,
                           name: "Carbono R3",
                           price: "1.000,00 €",
                        },
                     ],
                     totalPrice: "1.000,00 €",
                  },
               },
            },
         ],
         [
            {
               global: {
                  isLoading: true,
               },
               aside: {
                  cart: {
                     bikes: [
                        {
                           count: 2,
                           ean: 123908123,
                           name: "Carbono R3",
                           price: "1.000,00 €",
                        },
                     ],
                     totalPrice: "2.000,00 €",
                  },
               },
            },
         ],
         [
            {
               global: {
                  isLoading: false,
               },
               aside: {
                  cart: {
                     bikes: [
                        {
                           count: 2,
                           ean: 123908123,
                           name: "Carbono R3",
                           price: "1.000,00 €",
                        },
                     ],
                     totalPrice: "2.000,00 €",
                  },
               },
            },
         ],
      ]
      expect(renderSpy.mock.calls).toStrictEqual([
         ...expectedRendersForFirstAddedBike,
         ...expextedRendersForSecondAddedBike,
      ])
   })

   it("displays the shopping cart with two different bikes", async () => {
      const backend = new BikeBackendGateway()
      const cart = new CartStorageGateway()

      const useCase = new AddBikeToCart(backend, cart, presenter)

      const firstBikeToAdd = {
         ean: 123908123,
      }

      const secondBikeToAdd = {
         ean: 235235235,
      }

      await useCase.execute(firstBikeToAdd)
      await useCase.execute(secondBikeToAdd)

      expect(renderSpy).toHaveBeenLastCalledWith({
         global: { isLoading: false },
         aside: {
            cart: {
               bikes: [
                  {
                     count: 1,
                     ean: 123908123,
                     name: "Carbono R3",
                     price: "1.000,00 €",
                  },
                  {
                     count: 1,
                     ean: 235235235,
                     name: "Generalized Asphalt G-Works",
                     price: "2.000,00 €",
                  },
               ],
               totalPrice: "3.000,00 €",
            },
         },
      })
   })

   it("stores the cart after adding a bike", async () => {
      const backend = new BikeBackendGateway()
      const cart = new CartStorageGateway()
      const useCase = new AddBikeToCart(backend, cart, presenter)

      expect(cart.load().isEmpty()).toStrictEqual(true)

      const bikeToAdd = {
         ean: 123908123,
      }

      await useCase.execute(bikeToAdd)
      const newCart = cart.load()

      expect(newCart.products).toBeDefined()
      expect(newCart.products[0].ean).toEqual(123908123)
   })
})
