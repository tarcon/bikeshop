import React from "react"
import { WelcomeViewModel } from "@bikeshop/core"

export function WelcomePage(props: { welcomeViewModel: WelcomeViewModel }) {
   return (
      <div className="row">
         <div className="col-6-md">
            <p>{props.welcomeViewModel.welcomeText}</p>
         </div>

         <div className="col-3-md">
            <img
               src="./img/cleancode.jpg"
               width="100"
               alt="Powered by clean code"
            />
         </div>
      </div>
   )
}
