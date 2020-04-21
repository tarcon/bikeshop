import { BikeStorageGateway } from "./BikeStorageGateway"
import { BikeStorage } from "./BikeStorage"
import { Bike } from "../Shop/entities/Bike"
import { aBike } from "../Shop/entities/BikeProvisioning"

describe("Bike Storage", () => {
   it("can load available bikes", async () => {
      const bikes = await new BikeStorageGateway().fetchPurchasableBikes()
      expect(bikes).toHaveLength(3)
   })

   it("can map stored bike entity to domain bike entity", async () => {
      BikeStorage.StoredBikes = [
         {
            ean: 789,
            name: "name",
            price: 1337,
            productImageFileName: "file.jpg",
            description: "description",
         },
      ]

      const expectedBike = aBike({
         ean: 789,
         name: "name",
         price: 1337,
         productImageFileName: "file.jpg",
         description: "description",
      })

      const fetchedBikes = await new BikeStorageGateway().fetchPurchasableBikes()

      expect(fetchedBikes).toHaveLength(1)
      expect(fetchedBikes[0]).toStrictEqual(expectedBike)
   })

   it("returns no bikes when no bikes are stored", async () => {
      BikeStorage.StoredBikes = []

      const fetchedBikes = await new BikeStorageGateway().fetchPurchasableBikes()

      expect(fetchedBikes).toStrictEqual([])
   })

   it("returns available stored bikes", async () => {
      BikeStorage.StoredBikes = [
         aBike({
            ean: 123,
         }),
         aBike({
            ean: 456,
         }),
      ]

      const fetchedBikes = await new BikeStorageGateway().fetchPurchasableBikes()

      expect(fetchedBikes).toHaveLength(2)
      expect(fetchedBikes[0]).toStrictEqual(
         new Bike(
            123,
            expect.anything(),
            expect.anything(),
            expect.anything(),
            expect.anything()
         )
      )
      expect(fetchedBikes[1]).toStrictEqual(
         new Bike(
            456,
            expect.anything(),
            expect.anything(),
            expect.anything(),
            expect.anything()
         )
      )
   })
})
