import React from "react"
import { WelcomePageViewModel } from "@bikeshop/shop"

export function WelcomePage(props: { viewModel: WelcomePageViewModel }) {
   return (
      <div className="row">
         <div className="col-6-md">
            <p>{props.viewModel.content}</p>
         </div>

         <div className="col-3-md">
            <img
               src="/images/cleancode.jpg"
               width="100"
               alt="Powered by clean code"
            />
         </div>
      </div>
   )
}
