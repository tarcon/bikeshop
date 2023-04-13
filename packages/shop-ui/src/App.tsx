import React, { useContext } from "react"
import { ShopContext } from "./ShopContext"
import { BikesViewModel } from "@bikeshop/shop"
import { WelcomeViewModel } from "@bikeshop/shop"
import { AppViewModel } from "./ShopContextProvider"
import { BikesPage } from "./pages/BikesPage"
import { WelcomePage } from "./pages/WelcomePage"
import { Header } from "./components/Header"
import { Navigation } from "./components/Navigation"

import "./css/main.css"
import { ShoppingCart } from "./components/ShoppingCart"

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
      <div>
         <Header />
         <div className="card">
            <Navigation />
            <div className="row">
               <div className="col-8">
                  <section style={{ padding: "0 24px" }}>{content}</section>
               </div>
               <div className="col-4">
                  <ShoppingCart />
               </div>
            </div>
         </div>
      </div>
   )
}

export default App
