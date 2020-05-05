import React from "react"

export function BikeGraphic({
   rimColor = "#3A3A3A",
   spokeColor = "#C4C4C4",
   seatPostColor = "#454545",
   saddleColor = "black",
   barColor = "black",
   tireColor = "black",
   frameColor = "#FF8A00",
   style,
   className = "",
}: {
   rimColor?: string
   spokeColor?: string
   seatPostColor?: string
   saddleColor?: string
   barColor?: string
   tireColor?: string
   frameColor?: string
   style?: object
   className?: string
}) {
   return (
      <svg
         viewBox="0 0 729 432"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         style={style}
         className={className}
      >
         <path
            d="M36.9998 240.455L143.959 287.196L49.9998 217.938L36.9998 240.455Z"
            fill={spokeColor}
         />
         <path
            d="M240.542 217L146.583 286.258L253.542 239.517L240.542 217Z"
            fill={spokeColor}
         />
         <path
            d="M157.363 405.897L144.363 289.897L131.363 405.897L157.363 405.897Z"
            fill={spokeColor}
         />
         <circle
            cx="145.5"
            cy="286.5"
            r="131"
            stroke={rimColor}
            strokeWidth="29"
         />
         <circle
            cx="145.5"
            cy="286.5"
            r="141.5"
            stroke={tireColor}
            strokeWidth="8"
         />
         <path
            d="M477 238.455L583.959 285.196L490 215.938L477 238.455Z"
            fill={spokeColor}
         />
         <path
            d="M680.542 215L586.583 284.258L693.542 237.517L680.542 215Z"
            fill={spokeColor}
         />
         <path
            d="M597.363 403.897L584.363 287.897L571.363 403.897L597.363 403.897Z"
            fill={spokeColor}
         />
         <circle
            cx="583.5"
            cy="286.5"
            r="131"
            stroke={rimColor}
            strokeWidth="29"
         />
         <circle
            cx="583.5"
            cy="286.5"
            r="141.5"
            stroke={tireColor}
            strokeWidth="8"
         />
         <path
            d="M246.5 101L281.5 101L239.5 14L188.5 14L239.5 32L213.5 32L246.5 101Z"
            fill={seatPostColor}
         />
         <path
            d="M189 14L239 14L293 1.04904e-05L149.5 1.22504e-05L189 14Z"
            fill={saddleColor}
         />
         <path
            d="M511 90H241L273.5 156L145 285L282 172L341.5 295L145 287.5L373.5 331L487.5 127L374.5 291L282 103.5L488.5 125L586 286L511 90Z"
            fill={frameColor}
         />
         <path
            d="M461.5 110L488 78H534H618L607.317 90H655.5L595.744 103L581.5 119H539.5L595.744 103L607.317 90H511L461.5 110Z"
            fill={barColor}
         />
      </svg>
   )
}
