import React from "react"
import { BikeGraphic } from "./BikeGraphic"
import "../css/header.css"
import { Logo } from "./Logo"

const HEIGHT = 200
const LOGO_HEIGHT = 35

export function Header() {
   return (
      <nav
         className="header_background"
         style={{
            height: HEIGHT,
            padding: 18,
         }}
      >
         <BikeGraphic frameColor="white" style={{ height: 300 }} />
         <Logo
            color="black"
            className="pull-right"
            style={{
               height: LOGO_HEIGHT,
               right: LOGO_HEIGHT * 2,
               top: HEIGHT / 2 - LOGO_HEIGHT / 2,
            }}
         />
      </nav>
   )
}
