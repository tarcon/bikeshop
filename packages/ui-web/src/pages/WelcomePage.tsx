import React from "react"
import { WelcomeViewModel } from "@bikeshop/shop"

export function WelcomePage(props: { welcomeViewModel: WelcomeViewModel }) {
   return (
      <div className="row">
         <div className="col-6-md">
            <p>{props.welcomeViewModel.welcomeText}</p>
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
