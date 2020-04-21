import logo from "./logo.svg"
import React from "react"

export function Header() {
   return (
      <>
         <nav className="flex items-center justify-between flex-wrap bg-blue-700 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
               <img src={logo} style={{ width: 220 }} alt="Logo" />
               <span className="font-semibold text-xl">Online Bikeshop</span>
            </div>
         </nav>
      </>
   )
}
