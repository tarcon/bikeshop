import React from "react"
import { Controller, ViewModel } from "@bikeshop/shop"

export type ShopContextType = {
   controller: Controller | null
   shopViewModel: Readonly<ViewModel>
}

export const ShopContext = React.createContext<ShopContextType>({
   controller: null,
   shopViewModel: {
      global: {
         isLoading: true,
      },
   },
})
