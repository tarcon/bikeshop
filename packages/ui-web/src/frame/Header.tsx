import React from "react"
import { BikeGraphic } from "./BikeGraphic"
import "../css/header.css"
import { Logo } from "./Logo"

const HEIGHT = 200
const LOGO_HEIGHT = 35

export function Header() {
   return (
      <nav className="header_background p-6" style={{ height: HEIGHT }}>
         <BikeGraphic
            className="ml-32"
            frameColor="white"
            style={{ height: 300 }}
         />
         <Logo
            color="black"
            className="absolute invisible md:visible lg:visible hide-mobile"
            style={{
               height: LOGO_HEIGHT,
               right: LOGO_HEIGHT * 2,
               top: HEIGHT / 2 - LOGO_HEIGHT / 2,
            }}
         />
      </nav>
   )
}
