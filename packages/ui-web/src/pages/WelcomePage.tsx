import React from "react"
import { WelcomeViewModel } from "@bikeshop/core"

export function WelcomePage(props: { welcomeViewModel: WelcomeViewModel }) {
   return (
      <div>
         <div>
            <p>{props.welcomeViewModel.welcomeText}</p>
         </div>
         <div>
            <div>
               <img
                  src="./img/cleancode.jpg"
                  width="200"
                  alt="Powered by clean code"
               />
            </div>
         </div>
      </div>
   )
}
