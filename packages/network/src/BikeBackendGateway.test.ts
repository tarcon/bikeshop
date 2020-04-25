import { BikeBackendGateway } from "./BikeBackendGateway"

describe("BikeBackendGateway", () => {
   it("can fetch all bikes ", async () => {
      const gateway = new BikeBackendGateway()

      expect(async () => {
         await gateway.fetchPurchasableBikes()
      }).not.toThrow()
   })

   it("can fetch one bike by ean", async () => {
      const gateway = new BikeBackendGateway()

      const bike = await gateway.fetchBikeByEAN(123908123)
      expect(bike).toBeDefined()
   })
})
