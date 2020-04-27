import { CartPresenter } from "./CartPresenter"
import { AddBikeToCartCartBikeOutput } from ".."

describe("CartPresenter", () => {
   let testRenderFn: () => void

   it("generates empty view model for cart without bikes", () => {
      const presenter = new CartPresenter(testRenderFn)

      const cartOutput = {
         bikes: [],
         totalPrice: 0,
      }

      presenter.displayCart(cartOutput)

      expect(testRenderFn).toHaveBeenCalledWith({
         bikes: [],
         totalPrice: "0,00 €",
      })
   })

   it("generates a view model for a filled cart", () => {
      const presenter = new CartPresenter(testRenderFn)

      const cartOutput = {
         bikes: [
            {
               count: 2,
               ean: 12345,
               name: "Bike1",
               price: 500,
            } as AddBikeToCartCartBikeOutput,
            {
               count: 1,
               ean: 67890,
               name: "Bike2",
               price: 1000,
            } as AddBikeToCartCartBikeOutput,
         ],
         totalPrice: 2000,
      }

      presenter.displayCart(cartOutput)

      expect(testRenderFn).toHaveBeenCalledWith({
         bikes: [
            { ean: 12345, count: 2, name: "Bike1", price: "500,00 €" },
            { ean: 67890, count: 1, name: "Bike2", price: "1.000,00 €" },
         ],
         totalPrice: "2.000,00 €",
      })
   })

   beforeEach(() => {
      testRenderFn = jest.fn()
   })
})
