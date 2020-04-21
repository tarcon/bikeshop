import { Cart } from "./Cart"
import { aBike } from "./BikeProvisioning"

describe("Cart", () => {
   it("can be created without bikes", () => {
      const cart = new Cart()
      expect(cart).toBeDefined()
   })

   it("can add a bike", () => {
      const cart = new Cart()
      const bike = aBike()

      cart.addBike(bike)

      expect(cart.bikes).toHaveLength(1)
      expect(cart.bikes[0]).toBe(bike)
   })
})
