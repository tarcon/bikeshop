import { CartProduct } from "./CartProduct"
import { aBike } from "./BikeProvisioning"

test("Cart Product can be created", () => {
   const cartProduct = CartProduct.of(aBike(), 1)
   expect(cartProduct.product).toStrictEqual(aBike())
   expect(cartProduct.count).toStrictEqual(1)
   expect(cartProduct.ean).toStrictEqual(aBike().ean)
})
