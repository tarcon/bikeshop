import { Product } from "./Product"

interface Countable {
   count: number
}

export type CountableProduct = Product & Countable
