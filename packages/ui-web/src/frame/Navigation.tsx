import React, { ReactNode, useContext, useState } from "react"
import { Pages, ShopContext } from "../ShopContext"
import { InlineProgressIndicator } from "../components/progress-indicators/InlineProgressIndicator"

export function Navigation() {
   const shopContext = useContext(ShopContext)

   const handleNavigateWelcome = async () => {
      await shopContext.useCases["SeeWelcome"].execute()
   }

   const handleNavigateBikes = async () => {
      await shopContext.useCases["SeeBikes"].execute()
   }

   return (
      <ul className="flex border-b pr-6 pl-6" style={{ marginTop: -40 }}>
         <li className="-mb-px mr-1">
            <NavigationButton
               active={shopContext.appViewModel.currentPage === Pages.Welcome}
               onClick={handleNavigateWelcome}
            >
               Welcome
            </NavigationButton>
         </li>
         <li className="-mb-px mr-1">
            <NavigationButton
               active={shopContext.appViewModel.currentPage === Pages.Bikes}
               onClick={handleNavigateBikes}
            >
               See Bikes
            </NavigationButton>
         </li>
      </ul>
   )
}

function NavigationButton(props: {
   active: boolean
   onClick: () => void
   children: ReactNode
}) {
   const [isLoading, setLoading] = useState(false)

   const handleNavigate = async () => {
      setLoading(true)
      await props.onClick()
      setLoading(false)
   }

   return (
      <button
         className={
            props.active
               ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
               : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
         }
         onClick={handleNavigate}
      >
         {props.children}
         {isLoading && <InlineProgressIndicator />}
      </button>
   )
}
