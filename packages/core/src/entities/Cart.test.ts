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

      cart.addProduct(bike)

      expect(cart.products).toHaveLength(1)
      expect(cart.products[0]).toBe(bike)
   })

   it("can remove a bike", () => {
      const cart = new Cart()
      cart.addProduct(aBike({ ean: 12345 }))

      cart.removeProductByEan(12345)

      expect(cart.products).toBeEmpty
   })

   it("can remove a bike from two bikes", () => {
      const cart = new Cart()
      cart.addProduct(aBike({ ean: 12345 }))
      cart.addProduct(aBike({ ean: 67890 }))

      cart.removeProductByEan(12345)

      expect(cart.products).toHaveLength(1)
      expect(cart.products[0].ean).toBe(67890)
   })

   it("removing a bike that is not present leaves cart untouched", () => {
      const cart = new Cart()
      cart.addProduct(aBike({ ean: 12345 }))
      cart.addProduct(aBike({ ean: 67890 }))

      cart.removeProductByEan(1337)

      expect(cart.products).toHaveLength(2)
      expect(cart.products[0].ean).toBe(12345)
      expect(cart.products[1].ean).toBe(67890)
   })
})
