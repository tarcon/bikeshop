import { Cart, LoadsCart, StoresCart } from "@bikeshop/core"

export class CartStorageGateway2 implements StoresCart, LoadsCart {
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
