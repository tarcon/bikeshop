import React from "react"
import { BikesViewModel, BikeViewModel } from "@bikeshop/shop"
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
                  productImageFileName={bike.productImageFileName}
                  description={bike.description}
               />
            ))}
         </div>
      </div>
   )
}
