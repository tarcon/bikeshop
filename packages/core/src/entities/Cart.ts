import { CartProduct } from "./CartProduct"
import { Product } from "./Product"

export class Cart {
   private _cartProducts: Array<CartProduct> = []

   public addProduct(product: Product): void {
      if (this.hasProduct(product)) {
         this.changeCount(product.ean, 1)
      } else {
         const newCartProduct = CartProduct.of(product, 1)
         this._cartProducts = [...this._cartProducts, newCartProduct]
      }
   }

   public removeProductByEan(ean: number): void {
      const cartProduct = this.findCartProduct(ean)
      if (!cartProduct) return

      if (cartProduct.count > 1) {
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

   hasProduct(product: Product) {
      return this.cartProducts.some(
         (cartProduct) =>
            product.ean === cartProduct.ean && cartProduct.count > 0
      )
   }

   isEmpty(): boolean {
      return this.cartProducts.length === 0
   }

   get cartProducts(): ReadonlyArray<CartProduct> {
      return this._cartProducts
   }

   private findCartProduct(ean: number): CartProduct | undefined {
      return this.cartProducts.find((cartProduct) => ean === cartProduct.ean)
   }

   private changeCount(ean: number, offset: number) {
      const newCount = this.countProduct(ean) + offset
      const cartProduct = this.findCartProduct(ean)
      if (!cartProduct) {
         return
      }

      cartProduct.count = newCount
   }
}
