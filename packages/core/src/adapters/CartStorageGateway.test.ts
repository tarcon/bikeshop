import { CartStorageGateway } from "./CartStorageGateway"
import { aBike } from "../domain/Bike.fixture"
import { Cart } from "../domain/Cart"

describe("CartStorageGateway", () => {
   it("can store an empty cart", () => {
      const gateway = new CartStorageGateway()
      const cart = new Cart()

      expect(() => {
         gateway.store(cart)
      }).not.toThrow()
   })

   it("can load an empty cart", () => {
      const gateway = new CartStorageGateway()
      const cart = new Cart()
      gateway.store(cart)

      expect(() => {
         const loadedCart = gateway.load()
         expect(loadedCart.isEmpty())
      }).not.toThrow()
   })

   it("can store a filled cart", () => {
      const gateway = new CartStorageGateway()
      const cart = new Cart()
      cart.addProduct(aBike())

      expect(() => {
         gateway.store(cart)
      }).not.toThrow()
   })

   it("can load a filled cart", () => {
      const gateway = new CartStorageGateway()
      const cart = new Cart()
      cart.addProduct(aBike())
      cart.addProduct(aBike())
      gateway.store(cart)

      expect(() => {
         const loadedCart = gateway.load()
         expect(!loadedCart.isEmpty())
      }).not.toThrow()
   })

   it("provides an initial cart before a cart has been stored", () => {
      const gateway = new CartStorageGateway()
      expect(() => {
         const initialCart = gateway.load()
         expect(initialCart).toStrictEqual(new Cart())
      }).not.toThrow()
   })
})
