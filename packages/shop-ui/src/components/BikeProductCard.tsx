import React, { useContext, useState } from "react"
import { BikeViewModel, UseCaseDefinitions } from "@bikeshop/shop"
import { ShopContext } from "../ShopContext"
import { InlineProgressIndicator } from "./progress-indicators/InlineProgressIndicator"

export function BikeProductCard({
   description,
   ean,
   name,
   price,
   productImageFileName,
}: BikeViewModel) {
   const shopContext = useContext(ShopContext)
   const [isLoading, setLoading] = useState(false)

   const handleAddToCart = async () => {
      setLoading(true)

      await shopContext.controller?.executeUseCase(
         UseCaseDefinitions.AddBikeToCart.name,
         {
            ean,
         }
      )
      setLoading(false)
   }

   return (
      <div className="col-4 card">
         <header>
            <h4 className="text-uppercase">{name}</h4>
         </header>
         <p>{description}</p>
         <img src={`/images/${productImageFileName}`} alt={name} />
         <footer>
            <h1 className="text-gray-200 font-bold text-xl">{price}</h1>
            <button
               disabled={isLoading}
               className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
               onClick={handleAddToCart}
            >
               Add to cart {isLoading && <InlineProgressIndicator />}
            </button>
         </footer>
      </div>
   )
}
