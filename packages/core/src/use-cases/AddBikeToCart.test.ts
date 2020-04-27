import { AddBikeToCartInput } from "./AddBikeToCart.in"
import { Cart, LoadsCart, StoresCart } from ".."
import { ProvidesBike } from ".."
import { DisplaysError } from ".."
import { DisplaysCart } from ".."
import { AddBikeToCart } from "./AddBikeToCart"
import { aBike } from ".."

describe("AddBikeToCart", () => {
   let emptyCart: StoresCart & LoadsCart
   let backendWithABike: ProvidesBike
   let backendWithoutBikes: ProvidesBike
   let ui: DisplaysError & DisplaysCart

   let useCase: AddBikeToCart
   let oneBikeToAdd: AddBikeToCartInput

   beforeEach(() => {
      setupMocks()

      useCase = new AddBikeToCart(backendWithABike, emptyCart, ui)

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
      expect(emptyCart.store).toHaveBeenCalled()
   })

   it("displays the shopping cart with the new bike", async () => {
      await useCase.execute(oneBikeToAdd)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(ui.displayCart).toHaveBeenCalled()
   })

   it("shows an error adding a bike for an EAN which doesn't exist in the backend", async () => {
      useCase = new AddBikeToCart(backendWithoutBikes, emptyCart, ui)

      await useCase.execute(oneBikeToAdd)

      expect(backendWithoutBikes.fetchBikeByEAN).toHaveBeenCalledWith(123)
      expect(emptyCart.store).not.toHaveBeenCalled()
      expect(ui.displayCart).not.toHaveBeenCalled()
      expect(ui.displayError).toHaveBeenCalled()
   })

   function setupMocks() {
      jest.resetAllMocks()

      emptyCart = {
         store: jest.fn(),
         load: jest.fn().mockReturnValue(new Cart()),
      }

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
