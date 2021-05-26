import React, { useContext } from "react"
import { ShopContext } from "../ShopContext"
import { BikesViewModel } from "@bikeshop/core"
import { WelcomeViewModel } from "@bikeshop/core"
import { AppViewModel } from "../ShopContextProvider"
import { BikesPage } from "../pages/BikesPage"
import { WelcomePage } from "../pages/WelcomePage"
import { Header } from "./Header"
import { Navigation } from "./Navigation"

import "../css/main.css"
import { ShoppingCart } from "../components/ShoppingCart"

function App() {
   const shopContext = useContext(ShopContext)

   const content = routeToCurrentPage(shopContext.appViewModel)

   function routeToCurrentPage(appViewModel: AppViewModel) {
      switch (appViewModel.currentPage) {
         case "Welcome":
            return (
               <WelcomePage
                  welcomeViewModel={
                     appViewModel.currentPageViewModel as WelcomeViewModel
                  }
               />
            )
         case "Bikes":
            return (
               <BikesPage
                  bikesViewModel={
                     appViewModel.currentPageViewModel as BikesViewModel
                  }
               />
            )
         case "Empty":
         default:
            return <div />
      }
   }

   return (
      <div style={{}}>
         <Header />
         <Navigation />
         <div className="grid grid-flow-col gap-4 p-8">
            <section>{content}</section>
            <ShoppingCart />
         </div>
      </div>
   )
}

export default App
