import {
   aBike,
   DisplaysCart,
   DisplaysError,
   LoadsCartBikes,
   RemovesCartBikes,
} from ".."
import { RemoveBikeFromCart } from "./RemoveBikeFromCart"
import { RemoveBikeFromCartInput } from "./RemoveBikeFromCart.in"

describe("AddBikeToCart", () => {
   let cart: RemovesCartBikes & LoadsCartBikes
   let ui: DisplaysError & DisplaysCart

   let useCase: RemoveBikeFromCart
   let firstBike: RemoveBikeFromCartInput

   beforeEach(() => {
      setupMocks()

      useCase = new RemoveBikeFromCart(ui, cart)

      firstBike = {
         ean: 123,
      }
   })

   it("can be executed", async () => {
      expect(async () => {
         await useCase.execute(firstBike)
      }).not.toThrow()
   })

   it("removes the bike from the stored cart", async () => {
      await useCase.execute(firstBike)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(cart.removeBikeByEan).toHaveBeenCalledWith(123)
   })

   it("displays the shopping cart with the remaining bikes", async () => {
      await useCase.execute(firstBike)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(ui.displayCart).toHaveBeenCalled()
   })

   it("calculates the total cart price", async () => {
      await useCase.execute(firstBike)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(ui.displayCart).toHaveBeenCalled()
   })

   function setupMocks() {
      jest.resetAllMocks()

      cart = {
         removeBikeByEan: jest.fn(),
         getBikes: jest.fn().mockReturnValue([aBike({ ean: 123 })]),
      }

      ui = {
         displayError: jest.fn(),
         displayCart: jest.fn(),
      }
   }
})
