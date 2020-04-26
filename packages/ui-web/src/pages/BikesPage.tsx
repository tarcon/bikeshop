import React from "react"
import { BikesViewModel } from "@bikeshop/core"
import { BikeProductCard } from "../components/BikeProductCard"

export function BikesPage(props: { bikesViewModel: BikesViewModel }) {
   return (
      <div>
         <div className="grid grid-flow-col gap-4 top">
            {props.bikesViewModel.map((bike) => (
               <BikeProductCard
                  key={bike.ean}
                  ean={bike.ean}
                  name={bike.name}
                  price={bike.price}
                  productImageUrl={bike.productImageUrl}
                  description={bike.description}
               />
            ))}
         </div>
      </div>
   )
}

