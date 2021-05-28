import React, { ReactNode, useContext, useState } from "react"
import { Pages, ShopContext } from "../ShopContext"
import { InlineProgressIndicator } from "./progress-indicators/InlineProgressIndicator"

export function Navigation() {
   const shopContext = useContext(ShopContext)

   const handleNavigateWelcome = async () => {
      await shopContext.useCases["SeeWelcome"].execute()
   }

   const handleNavigateBikes = async () => {
      await shopContext.useCases["SeeBikes"].execute()
   }

   return (
      <ul className="tabs" style={{ marginTop: -40 }}>
         <NavigationButton
            active={shopContext.appViewModel.currentPage === Pages.Welcome}
            onClick={handleNavigateWelcome}
         >
            Welcome
         </NavigationButton>
         <NavigationButton
            active={shopContext.appViewModel.currentPage === Pages.Bikes}
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
      <a
         className={props.active ? "button primary active" : "button"}
         onClick={handleNavigate}
      >
         {props.children}
         {isLoading && <InlineProgressIndicator />}
      </a>
   )
}
