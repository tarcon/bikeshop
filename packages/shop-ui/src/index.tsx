import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ShopContextProvider } from "./ShopContextProvider"

const container = document.getElementById("root")

const root = ReactDOM.createRoot(container!)

root.render(
   <ShopContextProvider>
      <App />
   </ShopContextProvider>
)
