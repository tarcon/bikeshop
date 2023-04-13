import { Bike } from "./Bike"

export function aBike(specificBike?: any): Bike {
   const defaultBike = {
      ean: 123,
      name: "Bike",
      price: 1000,
      productImageFileName: "pic.jpg",
      description: "nice Bike",
   }

   const bike = { ...defaultBike, ...specificBike }

   return new Bike(
      bike.ean,
      bike.name,
      bike.price,
      bike.productImageFileName,
      bike.description
   )
}
