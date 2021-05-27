import { LoadsCart } from "../application/interfaces/LoadsCart"
import { StoresCart } from "../application/interfaces/StoresCart"
import { Cart } from "../domain/Cart"

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
