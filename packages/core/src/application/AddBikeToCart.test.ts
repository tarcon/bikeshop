import { AddBikeToCartInput } from "./AddBikeToCart.in"
import { ProvidesBike } from "../index"
import { DisplaysError } from "../index"
import { DisplaysCart } from "../index"
import { AddBikeToCart } from "./AddBikeToCart"
import { aBike } from "../index"
import { LoadsCart } from "./capabilities/LoadsCart"
import { StoresCart } from "./capabilities/StoresCart"
import { Cart } from "../domain/Cart"

describe("AddBikeToCart", () => {
   let emptyCartSpy: StoresCart & LoadsCart
   let backendWithABikeSpy: ProvidesBike
   let backendWithoutBikesSpy: ProvidesBike
   let uiSpy: DisplaysError & DisplaysCart

   let useCase: AddBikeToCart
   let oneBikeToAdd: AddBikeToCartInput

   beforeEach(() => {
      setupMocks()

      useCase = new AddBikeToCart(backendWithABikeSpy, emptyCartSpy, uiSpy)

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

      expect(uiSpy.displayError).not.toHaveBeenCalled()
      expect(backendWithABikeSpy.fetchBikeByEAN).toHaveBeenCalledWith(123)
      expect(emptyCartSpy.store).toHaveBeenCalled()
   })

   it("displays the shopping cart with the new bike", async () => {
      await useCase.execute(oneBikeToAdd)

      expect(uiSpy.displayError).not.toHaveBeenCalled()
      expect(uiSpy.displayCart).toHaveBeenCalled()
   })

   it("shows an error adding a bike for an EAN which doesn't exist in the backend", async () => {
      useCase = new AddBikeToCart(backendWithoutBikesSpy, emptyCartSpy, uiSpy)

      await useCase.execute(oneBikeToAdd)

      expect(backendWithoutBikesSpy.fetchBikeByEAN).toHaveBeenCalledWith(123)
      expect(emptyCartSpy.store).not.toHaveBeenCalled()
      expect(uiSpy.displayCart).not.toHaveBeenCalled()
      expect(uiSpy.displayError).toHaveBeenCalled()
   })

   function setupMocks() {
      jest.resetAllMocks()

      emptyCartSpy = {
         store: jest.fn(),
         load: jest.fn().mockReturnValue(new Cart()),
      }

      backendWithABikeSpy = {
         fetchBikeByEAN: jest.fn().mockReturnValue(aBike({ ean: 123 })),
      }

      backendWithoutBikesSpy = {
         fetchBikeByEAN: jest
            .fn()
            .mockRejectedValue("404 - bike not found with ean"),
      }

      uiSpy = {
         displayError: jest.fn(),
         displayCart: jest.fn(),
      }
   }
})
