import { WelcomeViewModel } from "../../../Shop/presenter/WelcomeViewModel"

import React from "react"

export function WelcomePage(props: { welcomeViewModel: WelcomeViewModel }) {
   return (
      <div>
         <div className="flex mb-4">
            <div className="w-1/2 h-12">
               <p>{props.welcomeViewModel.welcomeText}</p>
            </div>
            <div className="w-1/2 h-12">
               <div className="flex items-center">
                  <img
                     src="./img/cleancode.jpg"
                     alt="Powered by clean code"
                     className="m-4 w-1/2"
                  />
               </div>
            </div>
         </div>
      </div>
   )
}
