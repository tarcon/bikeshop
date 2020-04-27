import { Bike } from "./Bike"

type Product = Bike

export class Cart {
   private _products: ReadonlyArray<Product> = []

   public addProduct(product: Product): void {
      this._products = [...this._products, product]
   }

   public removeProductByEan(ean: number) {
      this._products = this._products.filter((product) => ean !== product.ean)
   }

   get products(): ReadonlyArray<Product> {
      return this._products
   }
}
