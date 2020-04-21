import React, { useContext } from "react"
import { ShopContext } from "./ShopContext"
import { BikesViewModel } from "../Shop/presenter/BikesViewModel"
import { WelcomeViewModel } from "../Shop/presenter/WelcomeViewModel"
import { AppViewModel } from "./ShopContextProvider"
import { BikesPage } from "./pages/bikes/BikesPage"
import { WelcomePage } from "./pages/welcome/WelcomePage"
import { Header } from "./frame/Header"
import { Navigation } from "./frame/Navigation"

import "./css/tailwind.css"
import { ShoppingCart } from "./ShoppingCart"

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
      <>
         <Header />
         <Navigation />
         <hr />
         <div className="grid grid-flow-col gap-4 p-8">
            <section>{content}</section>
            <ShoppingCart />
         </div>
      </>
   )
}

export default App
