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
      <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-10 object-top">
         <div className="px-4 py-2 h-32">
            <h3 className="text-gray-900 font-bold text-1xl uppercase">
               {name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
         </div>
         <img
            className="h-56 w-full object-cover mt-2"
            src={productImageUrl}
            alt={name}
         />
         <div className="flex items-center justify-between px-4 py-2 bg-blue-700">
            <h1 className="text-gray-200 font-bold text-xl">{price}</h1>
            <button
               disabled={isLoading}
               className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
               onClick={handleAddToCart}
            >
               Add to cart {isLoading && <InlineProgressIndicator />}
            </button>
         </div>
      </div>
   )
}
