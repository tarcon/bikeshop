import { CartViewModel, createInitialViewModel, ViewModel } from "./ViewModel"
import { PresentableBikes } from "../../application/models/PresentableBikes"
import { PresentableCart } from "../../application/models/PresentableCart"
import { DisplaysLoading } from "../../application/interfaces/DisplaysLoading"
import { DisplaysWelcome } from "../../application/interfaces/DisplaysWelcome"
import { DisplaysBikes } from "../../application/interfaces/DisplaysBikes"
import { DisplaysCart } from "../../application/interfaces/DisplaysCart"
import { DisplaysError } from "../../application/interfaces/DisplaysError"

export enum Page {
   Welcome = "welcomePage",
   Bikes = "bikesPage",
   Empty = "emptyPage",
}

export class ShopPresenter
   implements
      DisplaysLoading,
      DisplaysWelcome,
      DisplaysBikes,
      DisplaysCart,
      DisplaysError
{
   private _state: ViewModel = createInitialViewModel()
   private _currentPage: Page = Page.Empty

   constructor(private readonly _renderFn: (viewModel: ViewModel) => void) {}

   public startLoading() {
      this._state.global.isLoading = true
      this.render()
   }

   public finishLoading() {
      this._state.global.isLoading = false
      this.render()
   }

   public displayError(error: string): void {
      console.error(error)
      this.displayPage(Page.Empty)
   }

   public displayWelcome(): any {
      this.displayPage(Page.Welcome, {
         content:
            "Welcome to our online bike shop with clean architecture. Order your bike, assured that our digital systems are built in a technically sustainable way.",
      })
   }

   public displayBikes(presentableBikes: PresentableBikes) {
      this.displayPage(Page.Bikes, {
         bikes: ShopPresenter.presentBikes(presentableBikes),
      })
   }

   public displayCart(cartOutput: PresentableCart): void {
      this._state.aside = {
         cart: ShopPresenter.presentCart(cartOutput),
      }
      this.render()
   }

   private displayPage(page: Page, data?: Record<string, any>) {
      this._currentPage = page
      if (data) {
         this._state[page] = data
      }
      this.render()
   }

   private static presentBikes(presentableBikes: PresentableBikes) {
      return presentableBikes.map((bike) => ({
         ean: bike.ean,
         name: bike.name,
         price: bike.price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
         }),
         productImageFileName: bike.productImageFileName,
         description: bike.description,
      }))
   }

   private static presentCart(cartOutput: PresentableCart): CartViewModel {
      return {
         bikes: cartOutput.bikes.map((cartBike) => ({
            count: cartBike.count,
            ean: cartBike.ean,
            name: cartBike.name,
            price: ShopPresenter.formatGermanPrice(cartBike.price),
         })),
         totalPrice: ShopPresenter.formatGermanPrice(cartOutput.totalPrice),
      }
   }

   private static formatGermanPrice(price: number) {
      return price.toLocaleString("de-DE", {
         style: "currency",
         currency: "EUR",
      })
   }

   private render(): void {
      this._renderFn(this.createViewModelDtoFromState())
   }

   private createViewModelDtoFromState(): ViewModel {
      const dto: ViewModel = createInitialViewModel()
      dto.global.isLoading = this._state.global.isLoading

      if (this._currentPage === Page.Welcome && this._state.welcomePage) {
         dto.welcomePage = {
            content: this._state.welcomePage.content,
         }
      } else if (this._currentPage === Page.Bikes && this._state.bikesPage) {
         dto.bikesPage = {
            bikes: this._state.bikesPage.bikes.map((bike) => ({
               ean: bike.ean,
               name: bike.name,
               price: bike.price,
               productImageFileName: bike.productImageFileName,
               description: bike.description,
            })),
         }
      }

      if (this._state.aside) {
         dto.aside = {
            cart: this._state.aside.cart && {
               bikes: this._state.aside.cart.bikes.map((bike) => ({
                  count: bike.count,
                  ean: bike.ean,
                  name: bike.name,
                  price: bike.price,
               })),
               totalPrice: this._state.aside.cart.totalPrice,
            },
         }
      }

      //it's just a shallow freeze
      return Object.freeze(dto)
   }
}
