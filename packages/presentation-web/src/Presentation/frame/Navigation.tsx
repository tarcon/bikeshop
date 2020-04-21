import React, { ReactNode, useContext, useState } from "react"
import { ShopContext } from "../ShopContext"
import { InlineProgressIndicator } from "../components/InlineProgressIndicator"

export function Navigation() {
   const shopContext = useContext(ShopContext)

   const handleNavigateWelcome = async () => {
      await shopContext.useCases["SeeWelcome"].execute()
   }

   const handleNavigateBikes = async () => {
      await shopContext.useCases["SeeBikes"].execute()
   }

   return (
      <ul className="flex p-8">
         <li className="mr-6">
            <NavigationButton onClick={handleNavigateWelcome}>
               Welcome
            </NavigationButton>
         </li>
         <li className="mr-6">
            <NavigationButton onClick={handleNavigateBikes}>
               See Bikes
            </NavigationButton>
         </li>
      </ul>
   )
}

function NavigationButton(props: { onClick: () => void; children: ReactNode }) {
   const [isLoading, setLoading] = useState(false)

   const handleNavigate = async () => {
      setLoading(true)
      await props.onClick()
      setLoading(false)
   }

   return (
      <button
         className="text-blue-500 hover:text-blue-800"
         onClick={handleNavigate}
      >
         {props.children}
         {isLoading && <InlineProgressIndicator />}
      </button>
   )
}
