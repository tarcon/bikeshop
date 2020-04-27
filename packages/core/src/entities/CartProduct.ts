import { Product } from "./Product"

export class CartProduct implements Identifiable, Countable {
   private readonly _product: Product
   private _count: number = 0

   private constructor(product: Product, count: number) {
      this._count = count
      this._product = product
   }

   public static of(product: Product, count: number) {
      return new CartProduct(product, count)
   }

   get count(): number {
      return this._count
   }

   set count(value: number) {
      this._count = value
   }

   get ean(): number {
      return this._product.ean
   }

   get product(): Product {
      return this._product
   }
}

interface Identifiable {
   ean: number
}

interface Countable {
   count: number
}
