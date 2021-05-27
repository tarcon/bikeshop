import { RemoveBikeFromCart } from "./RemoveBikeFromCart"
import { DisplaysCart } from "./capabilities/DisplaysCart"
import { aBike } from "../domain/BikeProvisioning"
import { LoadsCart } from "./capabilities/LoadsCart"
import { StoresCart } from "./capabilities/StoresCart"
import { DisplaysError } from "./capabilities/DisplaysError"
import { Cart } from "../domain/Cart"

describe("AddBikeToCart", () => {
   let emptyCartSpy: LoadsCart & StoresCart
   let twoBikesCartSpy: LoadsCart & StoresCart
   let uiSpy: DisplaysError & DisplaysCart

   let bikeToRemove = {
      ean: 123,
   }

   describe("for an empty cart", () => {
      it("can be executed", async () => {
         const useCase = new RemoveBikeFromCart(uiSpy, emptyCartSpy)
         expect(async () => {
            await useCase.execute(bikeToRemove)
         }).not.toThrow()
      })

      it("attempts to removes the bike from the stored cart", async () => {
         const useCase = new RemoveBikeFromCart(uiSpy, emptyCartSpy)

         await useCase.execute(bikeToRemove)

         expect(uiSpy.displayError).not.toHaveBeenCalled()
         expect(emptyCartSpy.store).toHaveBeenCalled()
      })

      it("displays an empty shopping cart", async () => {
         const useCase = new RemoveBikeFromCart(uiSpy, emptyCartSpy)

         await useCase.execute(bikeToRemove)

         expect(uiSpy.displayError).not.toHaveBeenCalled()
         expect(uiSpy.displayCart).toHaveBeenCalledWith({
            bikes: [],
            totalPrice: 0,
         })
      })
   })

   describe("for a filled cart", () => {
      it("can be executed", async () => {
         const useCase = new RemoveBikeFromCart(uiSpy, twoBikesCartSpy)

         expect(async () => {
            await useCase.execute(bikeToRemove)
         }).not.toThrow()
      })

      it("removes the bike from the stored cart", async () => {
         const useCase = new RemoveBikeFromCart(uiSpy, twoBikesCartSpy)

         await useCase.execute(bikeToRemove)

         expect(uiSpy.displayError).not.toHaveBeenCalled()
         expect(twoBikesCartSpy.store).toHaveBeenCalled()
      })

      it("displays the shopping cart with the remaining bike", async () => {
         const useCase = new RemoveBikeFromCart(uiSpy, twoBikesCartSpy)

         await useCase.execute(bikeToRemove)

         expect(uiSpy.displayError).not.toHaveBeenCalled()
         expect(uiSpy.displayCart).toHaveBeenCalledWith({
            bikes: [
               {
                  count: expect.anything(),
                  ean: expect.anything(),
                  name: expect.anything(),
                  price: 1000,
               },
            ],
            totalPrice: 1000,
         })
      })
   })

   beforeEach(() => {
      jest.resetAllMocks()

      emptyCartSpy = {
         store: jest.fn(),
         load: jest.fn().mockReturnValue(new Cart()),
      }

      const filledCartStub = new Cart()
      filledCartStub.addProduct(aBike())
      filledCartStub.addProduct(aBike())

      twoBikesCartSpy = {
         store: jest.fn(),
         load: jest.fn().mockReturnValue(filledCartStub),
      }

      uiSpy = {
         displayError: jest.fn(),
         displayCart: jest.fn(),
      }
   })
})
