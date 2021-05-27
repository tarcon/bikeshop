import { StoresCart } from "../boundaries/StoresCart"
import { LoadsCart } from "../boundaries/LoadsCart"
import { Cart } from "../entities/Cart"

export class CartStorageGateway implements StoresCart, LoadsCart {
   private _cart: Cart

   constructor() {
      this._cart = new Cart()
   }

   public store(cart: Cart) {
      this._cart = cart
   }

   public load(): Cart {
      return this._cart
   }
}
