import React from "react"
import { BikesPageViewModel, BikeViewModel } from "@bikeshop/shop"
import { BikeProductCard } from "../components/BikeProductCard"

export function BikesPage(props: { viewModel: BikesPageViewModel }) {
   return (
      <div>
         <div className="row">
            {props.viewModel.bikes.map((bike: BikeViewModel) => (
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
