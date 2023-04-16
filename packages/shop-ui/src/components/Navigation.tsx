import React, { ReactNode, useContext, useState } from "react"
import { ShopContext } from "../ShopContext"
import { InlineProgressIndicator } from "./progress-indicators/InlineProgressIndicator"
import { UseCaseDefinitions } from "@bikeshop/shop"

export function Navigation() {
   const shopContext = useContext(ShopContext)

   const handleNavigateWelcome = async () => {
      await shopContext.controller?.executeUseCase(
         UseCaseDefinitions.SeeWelcome.name
      )
   }

   const handleNavigateBikes = async () => {
      await shopContext.controller?.executeUseCase(
         UseCaseDefinitions.SeeBikes.name
      )
   }

   return (
      <ul style={{ marginTop: -30 }}>
         <NavigationButton
            active={!!shopContext.shopViewModel.welcomePage}
            onClick={handleNavigateWelcome}
         >
            Welcome
         </NavigationButton>
         <NavigationButton
            active={!!shopContext.shopViewModel.bikesPage}
            onClick={handleNavigateBikes}
         >
            See Bikes
         </NavigationButton>
      </ul>
   )
}

function NavigationButton(props: {
   active: boolean
   onClick: () => void
   children: ReactNode
}) {
   const [isLoading, setLoading] = useState(false)

   const handleNavigate = async (event: any) => {
      setLoading(true)
      await props.onClick()
      setLoading(false)
      event.stopPropagation()
   }

   return (
      <button
         className={props.active ? "button primary" : "button"}
         onClick={handleNavigate}
      >
         {props.children}
         {isLoading && <InlineProgressIndicator />}
      </button>
   )
}
