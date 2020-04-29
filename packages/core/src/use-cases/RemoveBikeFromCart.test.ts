import {
   aBike,
   Cart,
   DisplaysCart,
   DisplaysError,
   LoadsCart,
   StoresCart,
} from ".."
import { RemoveBikeFromCart } from "./RemoveBikeFromCart"

describe("AddBikeToCart", () => {
   let emptyCartSpy: LoadsCart & StoresCart
   let twoBikesCartSpy: LoadsCart & StoresCart
   let ui: DisplaysError & DisplaysCart

   let bikeToRemove = {
      ean: 123,
   }

   describe("for an empty cart", () => {
      it("can be executed", async () => {
         const useCase = new RemoveBikeFromCart(ui, emptyCartSpy)
         expect(async () => {
            await useCase.execute(bikeToRemove)
         }).not.toThrow()
      })

      it("attempts to removes the bike from the stored cart", async () => {
         const useCase = new RemoveBikeFromCart(ui, emptyCartSpy)

         await useCase.execute(bikeToRemove)

         expect(ui.displayError).not.toHaveBeenCalled()
         expect(emptyCartSpy.store).toHaveBeenCalled()
      })

      it("displays an empty shopping cart", async () => {
         const useCase = new RemoveBikeFromCart(ui, emptyCartSpy)

         await useCase.execute(bikeToRemove)

         expect(ui.displayError).not.toHaveBeenCalled()
         expect(ui.displayCart).toHaveBeenCalledWith({
            bikes: [],
            totalPrice: 0,
         })
      })
   })

   describe("for a filled cart", () => {
      it("can be executed", async () => {
         const useCase = new RemoveBikeFromCart(ui, twoBikesCartSpy)

         expect(async () => {
            await useCase.execute(bikeToRemove)
         }).not.toThrow()
      })

      it("removes the bike from the stored cart", async () => {
         const useCase = new RemoveBikeFromCart(ui, twoBikesCartSpy)

         await useCase.execute(bikeToRemove)

         expect(ui.displayError).not.toHaveBeenCalled()
         expect(twoBikesCartSpy.store).toHaveBeenCalled()
      })

      it("displays the shopping cart with the remaining bike", async () => {
         const useCase = new RemoveBikeFromCart(ui, twoBikesCartSpy)

         await useCase.execute(bikeToRemove)

         expect(ui.displayError).not.toHaveBeenCalled()
         expect(ui.displayCart).toHaveBeenCalledWith({
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

      ui = {
         displayError: jest.fn(),
         displayCart: jest.fn(),
      }
   })
})
