import { Product } from "./Product"
import { CountableProduct } from "./CountableProduct"

export class Cart {
   private _products: Array<CountableProduct> = []

   public addProduct(productToAdd: Product): void {
      if (this.hasProduct(productToAdd)) {
         this.changeCount(productToAdd.ean, 1)
      } else {
         const newProduct = productToAdd as CountableProduct
         newProduct.count = 1
         this._products.push(newProduct)
      }
   }

   public removeProductByEan(ean: number): void {
      const product = this.findProduct(ean)
      if (!product) return

      if (product.count > 1) {
         this.changeCount(ean, -1)
      } else {
         this._products = this._products.filter(
            (countableProduct) => ean !== countableProduct.ean
         )
      }
   }

   public countProduct(ean: number): number {
      const product = this._products.find((product) => ean === product.ean)

      if (!product) {
         return 0
      }

      return product.count
   }

   hasProduct(product: Product) {
      return this._products.some(
         (existingProduct) => product.ean === existingProduct.ean
      )
   }

   isEmpty(): boolean {
      return this.products.length === 0
   }

   get products(): ReadonlyArray<CountableProduct> {
      return this._products
   }

   private findProduct(ean: number): CountableProduct | undefined {
      return this._products.find((product) => ean === product.ean)
   }

   private changeCount(ean: number, offset: number) {
      const newCount = this.countProduct(ean) + offset
      const product = this.findProduct(ean)
      if (!product) {
         return
      }

      product.count = newCount
   }
}
