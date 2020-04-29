import { CartProduct } from "./CartProduct"
import { Product } from "./Product"

export class Cart {
   private _cartProducts: Array<CartProduct> = []

   public addProduct(product: Product): void {
      if (this.countProduct(product.ean) === 0) {
         const newCartProduct = CartProduct.of(product, 1)
         this._cartProducts = [...this._cartProducts, newCartProduct]
      } else {
         this.changeCount(product.ean, 1)
      }
   }

   public removeProductByEan(ean: number) {
      if (this.countProduct(ean) > 1) {
         this.changeCount(ean, -1)
      } else {
         this._cartProducts = this._cartProducts.filter(
            (cartProduct) => ean !== cartProduct.ean
         )
      }
   }

   public countProduct(ean: number): number {
      const cartProduct = this._cartProducts.find(
         (cartProduct) => ean === cartProduct.ean
      )

      if (!cartProduct) {
         return 0
      }

      return cartProduct.count
   }

   get cartProducts(): ReadonlyArray<CartProduct> {
      return this._cartProducts
   }

   private changeCount(ean: number, offset: number) {
      const newCount = this.countProduct(ean) + offset
      const cartProduct = this._cartProducts.find(
         (cartProduct) => ean === cartProduct.ean
      )
      if (!cartProduct) {
         return
      }

      cartProduct.count = newCount
   }
}
