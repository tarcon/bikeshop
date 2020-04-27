import {
   aBike,
   Cart,
   DisplaysCart,
   DisplaysError,
   RemoveBikeFromCart,
} from "@bikeshop/core"
import { CartStorageGateway } from "@bikeshop/storage"

describe("RemoveBikeFromCart", () => {
   let ui: DisplaysError & DisplaysCart
   let cartStorageGateway: CartStorageGateway
   let useCase: RemoveBikeFromCart

   it("displays the shopping cart with one remaining bike after removing another one", async () => {
      const bikeToRemove = {
         ean: 123,
      }

      await useCase.execute(bikeToRemove)

      expect(ui.displayError).not.toHaveBeenCalled()
      expect(ui.displayCart).toHaveBeenCalledWith({
         bikes: [
            {
               count: 1,
               ean: 456,
               name: "Second",
               price: 999,
            },
         ],
         totalPrice: 999,
      })
   })

   beforeEach(() => {
      jest.resetAllMocks()

      ui = {
         displayError: jest.fn(),
         displayCart: jest.fn(),
      }

      const cartWithTwoBikes = new Cart()
      cartWithTwoBikes.addProduct(
         aBike({ name: "First", ean: 123, price: 1337 })
      )
      cartWithTwoBikes.addProduct(
         aBike({ name: "Second", ean: 456, price: 999 })
      )

      cartStorageGateway = new CartStorageGateway()
      cartStorageGateway.store(cartWithTwoBikes)

      useCase = new RemoveBikeFromCart(ui, cartStorageGateway)
   })
})
