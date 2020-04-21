import React from "react"
import { AppViewModel } from "./ShopContextProvider"

export enum Pages {
   Empty = "Empty",
   Welcome = "Welcome",
   Bikes = "Bikes",
}

export type ShopContextValue = {
   useCases: { [x: string]: any }
   appViewModel: AppViewModel
}

function initializeShopContextValue(): ShopContextValue {
   return {
      useCases: {},
      appViewModel: {
         currentPage: Pages.Empty,
         currentPageViewModel: {},
      },
   }
}

export const ShopContext = React.createContext<ShopContextValue>(
   initializeShopContextValue()
)
