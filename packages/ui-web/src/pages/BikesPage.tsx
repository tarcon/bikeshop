import React from "react"
import { BikesViewModel, BikeViewModel } from "@bikeshop/core"
import { BikeProductCard } from "../components/BikeProductCard"

export function BikesPage(props: { bikesViewModel: BikesViewModel }) {
   return (
      <div>
         <div className="row">
            {props.bikesViewModel.map((bike: BikeViewModel) => (
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
