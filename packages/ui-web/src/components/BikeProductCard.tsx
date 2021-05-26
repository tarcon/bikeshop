import React, { useContext, useState } from "react"
import { AddBikeToCartInput, BikeViewModel } from "@bikeshop/core"
import { ShopContext } from "../ShopContext"
import { InlineProgressIndicator } from "./progress-indicators/InlineProgressIndicator"

export function BikeProductCard({
   ean,
   name,
   price,
   productImageUrl,
   description,
}: BikeViewModel) {
   const shopContext = useContext(ShopContext)
   const [isLoading, setLoading] = useState(false)

   const handleAddToCart = async () => {
      setLoading(true)

      const addBikeToCartInput: AddBikeToCartInput = {
         ean: ean,
      }

      await shopContext.useCases["AddBikeToCart"].execute(addBikeToCartInput)
      setLoading(false)
   }

   return (
      <div className="col-4 card">
         <header>
            <h4 className="text-uppercase">{name}</h4>
         </header>
         <p>{description}</p>
         <img src={productImageUrl} alt={name} />
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
