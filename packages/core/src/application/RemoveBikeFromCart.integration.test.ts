import { RemoveBikeFromCart } from "./RemoveBikeFromCart"
import { CartStorageGateway } from "../adapters/CartStorageGateway"
import { DisplaysCart } from "./interfaces/DisplaysCart"
import { aBike } from "../domain/BikeProvisioning"
import { DisplaysError } from "./interfaces/DisplaysError"
import { Cart } from "../domain/Cart"

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
               count: 2,
               ean: 456,
               name: "SomeOtherBrand",
               price: 300,
            },
         ],
         totalPrice: 600,
      })
   })

   beforeEach(() => {
      jest.resetAllMocks()

      ui = {
         displayError: jest.fn(),
         displayCart: jest.fn(),
      }

      const cartWithThreeBikes = new Cart()
      cartWithThreeBikes.addProduct(
         aBike({ name: "SomeBrand", ean: 123, price: 100 })
      )
      cartWithThreeBikes.addProduct(
         aBike({ name: "SomeOtherBrand", ean: 456, price: 300 })
      )
      cartWithThreeBikes.addProduct(
         aBike({ name: "SomeOtherBrand", ean: 456, price: 300 })
      )

      cartStorageGateway = new CartStorageGateway()
      cartStorageGateway.store(cartWithThreeBikes)

      useCase = new RemoveBikeFromCart(ui, cartStorageGateway)
   })
})
