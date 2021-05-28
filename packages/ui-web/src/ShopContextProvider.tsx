import React, { useEffect, useState } from "react"
import { Pages, ShopContext } from "./ShopContext"
import {
   AddBikeToCart,
   BikeBackendGateway,
   BikesPresenter,
   CartPresenter,
   CartStorageGateway,
   CartViewModel,
   RemoveBikeFromCart,
   SeeBikes,
   SeeWelcome,
   WelcomePresenter,
} from "@bikeshop/core"

export type AppViewModel = {
   currentPage: Pages
   shoppingCartViewModel?: CartViewModel
   currentPageViewModel: object
}

const bikeBackend = new BikeBackendGateway()
const cartStorage = new CartStorageGateway()

export function ShopContextProvider(props: { children: React.ReactNode }) {
   let [appViewModel, setAppViewModel] = useState<AppViewModel>({
      currentPage: Pages.Empty,
      currentPageViewModel: {},
   })

   const welcomePresenter = new WelcomePresenter((welcomeViewModel) => {
      const state = {
         ...appViewModel,
         currentPage: Pages.Welcome,
         currentPageViewModel: welcomeViewModel,
      }
      setAppViewModel(state)
   })

   const bikesPresenter = new BikesPresenter((bikesViewModel) => {
      const state = {
         ...appViewModel,
         currentPage: Pages.Bikes,
         currentPageViewModel: bikesViewModel,
      }
      setAppViewModel(state)
   })

   const cartPresenter = new CartPresenter((cartViewModel) => {
      const state = {
         ...appViewModel,
         shoppingCartViewModel: cartViewModel,
      }
      setAppViewModel(state)
   })

   const useCases = {
      SeeWelcome: new SeeWelcome(welcomePresenter),
      SeeBikes: new SeeBikes(bikeBackend, bikesPresenter),
      AddBikeToCart: new AddBikeToCart(bikeBackend, cartStorage, cartPresenter),
      RemoveBikeFromCart: new RemoveBikeFromCart(cartPresenter, cartStorage),
   }

   useEffect(() => {
      useCases["SeeWelcome"].execute()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <ShopContext.Provider
         value={{
            appViewModel: appViewModel,
            useCases: useCases,
         }}
      >
         {props.children}
      </ShopContext.Provider>
   )
}
