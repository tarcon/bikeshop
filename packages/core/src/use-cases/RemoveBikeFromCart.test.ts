import { Cart, DisplaysCart, DisplaysError, LoadsCart, StoresCart } from ".."
import { RemoveBikeFromCart } from "./RemoveBikeFromCart"
import { RemoveBikeFromCartInput } from "./RemoveBikeFromCart.in"

describe("AddBikeToCart", () => {
   let cart: LoadsCart & StoresCart
   let ui: DisplaysError & DisplaysCart

   let useCase: RemoveBikeFromCart
   let bikeToRemove: RemoveBikeFromCartInput

   beforeEach(() => {
      setupMocks()

      useCase = new RemoveBikeFromCart(ui, cart)

      bikeToRemove = {
         ean: 123,
      }
   })

   it("can be executed", async () => {
      expect(async () => {
         await useCase.execute(bikeToRemove)
      }).not.toThrow()
   })

   it("removes the bike from the stored cart", async () => {
      await useCase.execute(bikeToRemove)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(cart.store).toHaveBeenCalled()
   })

   it("displays the shopping cart with the remaining bikes", async () => {
      await useCase.execute(bikeToRemove)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(ui.displayCart).toHaveBeenCalled()
   })

   it("calculates the total cart price", async () => {
      await useCase.execute(bikeToRemove)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(ui.displayCart).toHaveBeenCalled()
   })

   function setupMocks() {
      jest.resetAllMocks()

      cart = {
         store: jest.fn(),
         load: jest.fn().mockReturnValue(new Cart()),
      }

      ui = {
         displayError: jest.fn(),
         displayCart: jest.fn(),
      }
   }
})
