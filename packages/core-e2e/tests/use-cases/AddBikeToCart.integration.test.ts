import {
   aBike,
   AddBikeToCart,
   DisplaysCart,
   DisplaysError,
} from "@bikeshop/core"
import { BikeBackendGateway } from "@bikeshop/network"
import { CartStorageGateway } from "@bikeshop/storage"

describe("AddBikeToCart", () => {
   let ui: DisplaysError & DisplaysCart

   it("displays the shopping cart with two bike", async () => {
      const backend = new BikeBackendGateway()
      const cart = new CartStorageGateway()

      const useCase = new AddBikeToCart(backend, cart, ui)

      const bikeToAdd = {
         ean: 123908123,
      }

      await useCase.execute(bikeToAdd)
      await useCase.execute(bikeToAdd)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(ui.displayCart).toHaveBeenCalledWith({
         bikes: [
            {
               ean: 123908123,
               name: "Carbono R3",
               price: 4499,
            },
            {
               ean: 123908123,
               name: "Carbono R3",
               price: 4499,
            },
         ],
         totalPrice: 8998,
      })
   })

   it("stores the cart after adding a bike", async () => {
      const backend = new BikeBackendGateway()
      const cart = new CartStorageGateway()
      const useCase = new AddBikeToCart(backend, cart, ui)
      const bikeToAdd = {
         ean: 123908123,
      }
      await useCase.execute(bikeToAdd)
      expect(cart.load().products).toBeEmpty

      const newCart = cart.load()

      expect(newCart.products).toBeDefined
      expect(newCart.products).toStrictEqual([
         aBike({
            description:
               "A racing bike with a long heritage of classic race wins. Prefered by dentists.",
            ean: 123908123,
            name: "Carbono R3",
            price: 4499,
            productImageFileName: "carbono.jpg",
         }),
      ])
   })

   beforeEach(() => {
      jest.resetAllMocks()

      ui = {
         displayError: jest.fn(),
         displayCart: jest.fn(),
      }
   })
})
