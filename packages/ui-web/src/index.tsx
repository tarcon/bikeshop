import React from "react"
import ReactDOM from "react-dom"
import App from "./frame/App"
import { ShopContextProvider } from "./ShopContextProvider"
import { BikeBackendGateway, CartStorageGateway } from "@bikeshop/core"

const bikeBackend = new BikeBackendGateway()
const cartStorage = new CartStorageGateway()

ReactDOM.render(
   <>
      <ShopContextProvider bikeBackend={bikeBackend} cartStorage={cartStorage}>
         <App />
      </ShopContextProvider>
   </>,
   document.getElementById("root")
)
