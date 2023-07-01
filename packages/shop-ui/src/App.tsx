import React, { useContext } from "react"
import { ShopContext } from "./ShopContext"
import { BikesPage } from "./pages/BikesPage"
import { WelcomePage } from "./pages/WelcomePage"
import { Header } from "./components/Header"
import { Navigation } from "./components/Navigation"

import "./css/main.css"
import { ShoppingCart } from "./components/ShoppingCart"

function App() {
   const { shopViewModel } = useContext(ShopContext)

   return (
      <div>
         <Header />
         <div className="card">
            <Navigation />
            <div className="row">
               <div className="col-8">
                  <section style={{ padding: "0 24px" }}>
                     {shopViewModel.welcomePage && (
                        <WelcomePage viewModel={shopViewModel.welcomePage} />
                     )}
                     {shopViewModel.bikesPage && (
                        <BikesPage viewModel={shopViewModel.bikesPage} />
                     )}
                  </section>
               </div>
               {shopViewModel.aside && (
                  <div className="col-4">
                     {shopViewModel.aside.cart && (
                        <ShoppingCart viewModel={shopViewModel.aside.cart} />
                     )}
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default App
