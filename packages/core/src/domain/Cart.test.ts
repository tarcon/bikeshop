import { Cart } from "./Cart"
import { aBike } from "./Bike.fixture"
import { oneBikeInCart } from "./CountableProduct.fixture"

describe("Cart", () => {
   it("can be created without products", () => {
      const cart = new Cart()
      expect(cart).toBeDefined()
   })

   it("can add products", () => {
      const cart = new Cart()

      cart.addProduct(aBike({ ean: 123 }))
      cart.addProduct(aBike({ ean: 456 }))

      expect(cart.products).toHaveLength(2)
      expect(cart.products[0]).toEqual(oneBikeInCart({ ean: 123 }))
      expect(cart.products[1]).toEqual(oneBikeInCart({ ean: 456 }))
   })

   it("can remove a product", () => {
      const cart = new Cart()
      cart.addProduct(aBike({ ean: 12345 }))

      cart.removeProductByEan(12345)

      expect(cart.isEmpty()).toBe(true)
   })

   it("can remove a product from two product", () => {
      const cart = new Cart()
      cart.addProduct(aBike({ ean: 12345 }))
      cart.addProduct(aBike({ ean: 67890 }))

      cart.removeProductByEan(12345)

      expect(cart.products).toHaveLength(1)
      expect(cart.products[0]).toEqual(oneBikeInCart({ ean: 67890 }))
   })

   it("removing a product that is not present leaves cart untouched", () => {
      const cart = new Cart()
      cart.addProduct(aBike({ ean: 12345 }))
      cart.addProduct(aBike({ ean: 67890 }))

      cart.removeProductByEan(1337)

      expect(cart.products).toHaveLength(2)
      expect(cart.products[0].ean).toBe(12345)
      expect(cart.products[1].ean).toBe(67890)
   })

   it("removes products from the cart if the last one is removed", () => {
      const cart = new Cart()
      cart.addProduct(aBike({ ean: 123 }))
      expect(cart.products).toHaveLength(1)

      cart.removeProductByEan(123)

      expect(cart.isEmpty()).toBe(true)
   })

   it("provides the product count", () => {
      const cart = new Cart()
      expect(cart.isEmpty()).toBe(true)

      cart.addProduct(aBike())

      expect(cart.products[0]).toHaveProperty("count")
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
