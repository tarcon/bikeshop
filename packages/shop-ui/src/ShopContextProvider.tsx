import React, { useEffect, useState } from "react"
import { ShopContext, ShopContextType } from "./ShopContext"
import { main, ViewModel, UseCaseDefinitions } from "@bikeshop/shop"

export function ShopContextProvider(props: { children: React.ReactNode }) {
   const [context, setContext] = useState<ShopContextType>({
      shopViewModel: {
         global: {
            isLoading: true,
         },
      },
      controller: null,
   })

   const renderFn = (viewModel: Readonly<ViewModel>) => {
      setContext((prevState) => {
         return {
            ...prevState,
            shopViewModel: viewModel,
         }
      })
   }

   useEffect(() => {
      const { controller } = main({ renderFn })
      setContext((prevState) => {
         return {
            ...prevState,
            controller: controller,
         }
      })
      controller.executeUseCase(UseCaseDefinitions.SeeWelcome.name)
   }, [])

   return (
      <ShopContext.Provider value={context}>
         {props.children}
      </ShopContext.Provider>
   )
}
