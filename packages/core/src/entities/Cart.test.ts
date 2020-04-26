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

   it("can remove a bike", () => {
      const cart = new Cart()
      cart.addBike(aBike({ ean: 12345 }))

      cart.removeBikeByEan(12345)

      expect(cart.bikes).toBeEmpty
   })

   it("can remove a bike from two bikes", () => {
      const cart = new Cart()
      cart.addBike(aBike({ ean: 12345 }))
      cart.addBike(aBike({ ean: 67890 }))

      cart.removeBikeByEan(12345)

      expect(cart.bikes).toHaveLength(1)
      expect(cart.bikes[0].ean).toBe(67890)
   })

   it("removing a bike that is not present leaves cart untouched", () => {
      const cart = new Cart()
      cart.addBike(aBike({ ean: 12345 }))
      cart.addBike(aBike({ ean: 67890 }))

      cart.removeBikeByEan(1337)

      expect(cart.bikes).toHaveLength(2)
      expect(cart.bikes[0].ean).toBe(12345)
      expect(cart.bikes[1].ean).toBe(67890)
   })
})
