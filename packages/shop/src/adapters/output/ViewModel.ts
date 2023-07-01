export const createInitialViewModel = () => {
   return {
      global: {
         isLoading: true,
      },
   }
}

export type ViewModel = {
   global: {
      isLoading: boolean
   }
   aside?: {
      cart?: CartViewModel
   }
   welcomePage?: WelcomePageViewModel
   bikesPage?: BikesPageViewModel
   emptyPage?: any
}

export type WelcomePageViewModel = {
   content: string
}

export type BikesPageViewModel = {
   bikes: BikesViewModel
}
export type BikesViewModel = BikeViewModel[]

export type BikeViewModel = {
   ean: number
   name: string
   price: string
   productImageFileName: string
   description: string
}

export type CartViewModel = {
   bikes: Array<{
      count: number
      ean: number
      name: string
      price: string
   }>
   totalPrice: string
}
