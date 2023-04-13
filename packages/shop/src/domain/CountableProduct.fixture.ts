import { CountableProduct } from "./CountableProduct"
import { Bike } from "./Bike"

export function oneBikeInCart(specificBikeInCart?: any): CountableProduct {
   const defaultBikeInCart = {
      ean: 123,
      name: "Bike",
      price: 1000,
      productImageFileName: "pic.jpg",
      description: "nice Bike",
   }

   const bike: Bike = { ...defaultBikeInCart, ...specificBikeInCart }

   return {
      ...new Bike(
         bike.ean,
         bike.name,
         bike.price,
         bike.productImageFileName,
         bike.description
      ),
      count: 1,
   } as CountableProduct
}
