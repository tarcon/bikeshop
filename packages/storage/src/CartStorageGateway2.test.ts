import { aBike, Cart } from "@bikeshop/core"
import { CartStorageGateway2 } from "./CartStorageGateway2"

describe("CartStorageGateway", () => {
   it("can store an empty cart", () => {
      const gateway = new CartStorageGateway2()
      const cart = new Cart()

      expect(() => {
         gateway.store(cart)
      }).not.toThrow()
   })

   it("can load an empty cart", () => {
      const gateway = new CartStorageGateway2()
      const cart = new Cart()
      gateway.store(cart)

      expect(() => {
         const loadedCart = gateway.load()
         expect(loadedCart).toBeEmpty
      }).not.toThrow()
   })

   it("can store a filled cart", () => {
      const gateway = new CartStorageGateway2()
      const cart = new Cart()
      cart.addBike(aBike())

      expect(() => {
         gateway.store(cart)
      }).not.toThrow()
   })

   it("can load a filled cart", () => {
      const gateway = new CartStorageGateway2()
      const cart = new Cart()
      cart.addBike(aBike())
      cart.addBike(aBike())
      gateway.store(cart)

      expect(() => {
         const loadedCart = gateway.load()

         expect(loadedCart.bikes).toBeDefined
         expect(loadedCart.bikes).toStrictEqual([aBike(), aBike()])
      }).not.toThrow()
   })

   it("provides an initial cart before a cart has been stored", () => {
      const gateway = new CartStorageGateway2()
      expect(() => {
         const initialCart = gateway.load()
         expect(initialCart).toStrictEqual(new Cart())
      }).not.toThrow()
   })
})
