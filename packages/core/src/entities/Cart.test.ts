import { Cart } from "./Cart"
import { aBike } from "./BikeProvisioning"

describe("Cart", () => {
   it("can be created without products", () => {
      const cart = new Cart()
      expect(cart).toBeDefined()
   })

   it("can add products", () => {
      const cart = new Cart()

      cart.addProduct(aBike({ ean: 123 }))
      cart.addProduct(aBike({ ean: 456 }))

      expect(cart.cartProducts).toHaveLength(2)
      expect(cart.cartProducts[0].product.ean).toBe(123)
      expect(cart.cartProducts[1].product.ean).toBe(456)
   })

   it("can remove a product", () => {
      const cart = new Cart()
      cart.addProduct(aBike({ ean: 12345 }))

      cart.removeProductByEan(12345)

      expect(cart.cartProducts).toStrictEqual([])
   })

   it("can remove a product from two product", () => {
      const cart = new Cart()
      cart.addProduct(aBike({ ean: 12345 }))
      cart.addProduct(aBike({ ean: 67890 }))

      cart.removeProductByEan(12345)

      expect(cart.cartProducts).toHaveLength(1)
      expect(cart.cartProducts[0].product.ean).toBe(67890)
   })

   it("removing a product that is not present leaves cart untouched", () => {
      const cart = new Cart()
      cart.addProduct(aBike({ ean: 12345 }))
      cart.addProduct(aBike({ ean: 67890 }))

      cart.removeProductByEan(1337)

      expect(cart.cartProducts).toHaveLength(2)
      expect(cart.cartProducts[0].product.ean).toBe(12345)
      expect(cart.cartProducts[1].product.ean).toBe(67890)
   })

   it("removes products from the cart if the last one is removed", () => {
      const cart = new Cart()
      cart.addProduct(aBike({ ean: 123 }))
      expect(cart.cartProducts).toHaveLength(1)

      cart.removeProductByEan(123)

      expect(cart.cartProducts).toStrictEqual([])
   })

   it("provides the raw cart product including its count", () => {
      const cart = new Cart()
      expect(cart.cartProducts).toStrictEqual([])

      cart.addProduct(aBike())

      expect(cart.cartProducts).toHaveLength(1)
      expect(cart.cartProducts[0]).toHaveProperty("product")
      expect(cart.cartProducts[0]).toHaveProperty("count")
   })

   describe("knows the count of its products", () => {
      it("after adding", () => {
         const cart = new Cart()

         cart.addProduct(aBike({ ean: 123 }))
         expect(cart.countProduct(123)).toStrictEqual(1)

         cart.addProduct(aBike({ ean: 123 }))
         expect(cart.countProduct(123)).toStrictEqual(2)

         cart.addProduct(aBike({ ean: 456 }))
         expect(cart.countProduct(123)).toStrictEqual(2)
         expect(cart.countProduct(456)).toStrictEqual(1)
      })

      it("after removing", () => {
         const cart = new Cart()

         cart.addProduct(aBike({ ean: 123 }))
         cart.addProduct(aBike({ ean: 123 }))
         cart.addProduct(aBike({ ean: 456 }))

         cart.removeProductByEan(123)
         expect(cart.countProduct(123)).toStrictEqual(1)
         expect(cart.countProduct(456)).toStrictEqual(1)

         cart.removeProductByEan(123)
         expect(cart.countProduct(123)).toStrictEqual(0)
         expect(cart.countProduct(456)).toStrictEqual(1)

         cart.removeProductByEan(123)
         expect(cart.countProduct(123)).toStrictEqual(0)
         expect(cart.countProduct(456)).toStrictEqual(1)

         cart.removeProductByEan(666)
         expect(cart.countProduct(123)).toStrictEqual(0)
         expect(cart.countProduct(456)).toStrictEqual(1)
      })

      it("counts non-present products as 0", () => {
         const cart = new Cart()

         expect(cart.countProduct(39058345)).toStrictEqual(0)
      })
   })
})
