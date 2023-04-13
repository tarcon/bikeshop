import { Bike } from "./Bike"

describe("Bike", () => {
   it("can be created with all its properties", () => {
      const bike = new Bike(123, "name", 1337, "file.jpg", "description")
      expect(bike.ean).toBe(123)
      expect(bike.name).toBe("name")
      expect(bike.price).toBe(1337)
      expect(bike.productImageFileName).toBe("file.jpg")
      expect(bike.description).toBe("description")
   })
})
