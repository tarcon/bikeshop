import {
   AddBikeToCart,
   CartPresenter,
   CartViewModel,
   DisplaysCart,
   DisplaysError,
} from "@bikeshop/core"
import { BikeBackendGateway } from "@bikeshop/network"
import { CartStorageGateway } from "@bikeshop/storage"

describe("AddBikeToCart", () => {
   let ui: DisplaysError & DisplaysCart

   it("displays the shopping cart with two bike", async (done) => {
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

      done()
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

   beforeEach(() => {
      jest.resetAllMocks()

      ui = {
         displayError: jest.fn(),
         displayCart: jest.fn(),
      }
   })
})
