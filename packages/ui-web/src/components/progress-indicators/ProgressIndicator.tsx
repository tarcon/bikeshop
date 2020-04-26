import React from "react"

export function ProgressIndicator() {
   return (
      <div>
         <svg
            width="200px"
            height="200px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
         >
            <circle
               cx="50"
               cy="50"
               r="22"
               strokeWidth="3"
               stroke="steelBlue"
               strokeDasharray="34.55751918948772 34.55751918948772"
               fill="none"
               strokeLinecap="round"
            >
               <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="0 50 50;360 50 50"
               />
            </circle>
         </svg>
      </div>
   )
}
