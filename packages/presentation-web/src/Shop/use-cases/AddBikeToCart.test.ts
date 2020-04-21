import { AddBikeToCart } from "./AddBikeToCart"
import { AddBikeToCartInput } from "./AddBikeToCartInput"
import { StoresCart } from "../boundaries/StoresCart"
import { aBike } from "../entities/BikeProvisioning"
import { ProvidesBike } from "../boundaries/ProvidesBike"
import { DisplaysError } from "../boundaries/DisplaysError"
import { DisplaysCart } from "../boundaries/DisplaysCart"

describe("AddBikeToCart", () => {
   let cart: StoresCart
   let backendWithABike: ProvidesBike
   let backendWithoutBikes: ProvidesBike
   let ui: DisplaysError & DisplaysCart

   let useCase: AddBikeToCart
   let oneBikeToAdd: AddBikeToCartInput

   beforeEach(() => {
      setupMocks()

      useCase = new AddBikeToCart(backendWithABike, cart, ui)

      oneBikeToAdd = {
         ean: 123,
      }
   })

   it("can be executed", async () => {
      expect(async () => {
         await useCase.execute(oneBikeToAdd)
      }).not.toThrow()
   })

   it("stores the added bike", async () => {
      await useCase.execute(oneBikeToAdd)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(backendWithABike.fetchBikeByEAN).toHaveBeenCalledWith(123)
      expect(cart.addBike).toHaveBeenCalledWith(aBike({ ean: 123 }))
   })

   it("displays the shopping cart with the new bike", async () => {
      await useCase.execute(oneBikeToAdd)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(ui.displayCart).toHaveBeenCalledWith({
         bikes: [
            {
               name: "Bike",
               price: 1000,
            },
         ],
         totalPrice: expect.anything(),
      })
   })

   it("calculates the total cart price", async () => {
      await useCase.execute(oneBikeToAdd)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(ui.displayCart).toHaveBeenCalledWith({
         bikes: expect.anything(),
         totalPrice: 1000,
      })
   })

   it("shows an error adding a bike for an EAN which doesn't exist in the backend", async () => {
      useCase = new AddBikeToCart(backendWithoutBikes, cart, ui)

      await useCase.execute(oneBikeToAdd)

      expect(backendWithoutBikes.fetchBikeByEAN).toHaveBeenCalledWith(123)
      expect(cart.addBike).not.toHaveBeenCalled()
      expect(ui.displayCart).not.toHaveBeenCalled()
      expect(ui.displayError).toHaveBeenCalled()
   })

   function setupMocks() {
      jest.resetAllMocks()

      cart = {
         addBike: jest.fn(),
         getBikes: jest.fn().mockReturnValue([aBike({ ean: 123 })]),
      } as StoresCart

      backendWithABike = {
         fetchBikeByEAN: jest.fn().mockReturnValue(aBike({ ean: 123 })),
      }

      backendWithoutBikes = {
         fetchBikeByEAN: jest
            .fn()
            .mockRejectedValue("404 - bike not found with ean"),
      }

      ui = {
         displayError: jest.fn(),
         displayCart: jest.fn(),
      }
   }
})
