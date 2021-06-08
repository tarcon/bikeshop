import { CartViewModel } from "../adapters/CartViewModel"
import { CartPresenter } from "../adapters/CartPresenter"
import { AddBikeToCart } from "./AddBikeToCart"
import { CartStorageGateway } from "../adapters/CartStorageGateway"
import { BikeBackendGateway } from "../adapters/BikeBackendGateway"
import { DisplaysCart } from "./interfaces/DisplaysCart"
import { DisplaysError } from "./interfaces/DisplaysError"

describe("AddBikeToCart", () => {
   let ui: DisplaysError & DisplaysCart =      {
      displayError: jest.fn(),
      displayCart: jest.fn(),
   }

   beforeEach(() => {
      jest.clearAllMocks()
   })

   it("displays the shopping cart with two bikes of the same kind", async () => {
      const backend = new BikeBackendGateway()
      const cart = new CartStorageGateway()
      const uiCalls: Array<CartViewModel> = []
      const ui = new CartPresenter((viewModel: CartViewModel) => {
         uiCalls.push(viewModel)
      })

      const useCase = new AddBikeToCart(backend, cart, ui)

      const bikeToAdd = {
         ean: 123908123,
      }

      await useCase.execute(bikeToAdd)
      await useCase.execute(bikeToAdd)

      expect(uiCalls[0]).toStrictEqual({
         bikes: [
            {
               count: 1,
               ean: 123908123,
               name: "Carbono R3",
               price: "4.499,00 €",
            },
         ],
         totalPrice: "4.499,00 €",
      })

      expect(uiCalls[1]).toStrictEqual({
         bikes: [
            {
               count: 2,
               ean: 123908123,
               name: "Carbono R3",
               price: "4.499,00 €",
            },
         ],
         totalPrice: "8.998,00 €",
      })
   })

   it("displays the shopping cart with two different bikes", async () => {
      const backend = new BikeBackendGateway()
      const cart = new CartStorageGateway()
      const uiCalls: Array<CartViewModel> = []
      const ui = new CartPresenter((viewModel: CartViewModel) => {
         uiCalls.push(viewModel)
      })

      const useCase = new AddBikeToCart(backend, cart, ui)

      const firstBikeToAdd = {
         ean: 123908123,
      }

      const secondBikeToAdd = {
         ean: 235235235,
      }

      await useCase.execute(firstBikeToAdd)
      await useCase.execute(secondBikeToAdd)

      expect(uiCalls[0]).toStrictEqual({
         bikes: [
            {
               count: 1,
               ean: 123908123,
               name: "Carbono R3",
               price: "4.499,00 €",
            },
         ],
         totalPrice: "4.499,00 €",
      })

      expect(uiCalls[1]).toStrictEqual({
         bikes: [
            {
               count: 1,
               ean: 123908123,
               name: "Carbono R3",
               price: "4.499,00 €",
            },
            {
               count: 1,
               ean: 235235235,
               name: "Generalized Asphalt G-Works",
               price: "7.999,00 €",
            },
         ],
         totalPrice: "12.498,00 €",
      })

   })

   it("stores the cart after adding a bike", async () => {
      const backend = new BikeBackendGateway()
      const cart = new CartStorageGateway()
      const useCase = new AddBikeToCart(backend, cart, ui)
      const bikeToAdd = {
         ean: 123908123,
      }
      expect(cart.load().isEmpty())

      await useCase.execute(bikeToAdd)
      const newCart = cart.load()

      expect(newCart.products).toBeDefined()
      expect(newCart.products[0].ean).toEqual(123908123)
   })
})
