import { CartStorageGateway } from "./CartStorageGateway"
import { aBike } from "../Shop/entities/BikeProvisioning"

describe("CartStorageGateway", () => {
   it("can add and get a bike", () => {
      const gateway = new CartStorageGateway()

      gateway.addBike(aBike())

      const bikes = gateway.getBikes()

      expect(bikes).toHaveLength(1)

      expect(bikes[0]).toStrictEqual(aBike())
   })

   it("can get all bikes for an empty cart", () => {
      const gateway = new CartStorageGateway()

      const bikes = gateway.getBikes()

      expect(bikes).toHaveLength(0)
   })

   it("can get all bikes for a cart with two bikes", () => {
      const gateway = new CartStorageGateway()

      gateway.addBike(aBike())
      gateway.addBike(aBike())

      const bikes = gateway.getBikes()

      expect(bikes).toHaveLength(2)
   })
})
