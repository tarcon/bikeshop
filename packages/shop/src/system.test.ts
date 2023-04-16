import { ShopPresenter } from "./adapters/output/ShopPresenter"
import { main } from "./main"

describe("Shop package api", () => {
   const renderSpy = jest.fn()

   describe("on the input side", () => {
      it("provides use case execution via controller", () => {
         const shop = main({ renderFn: renderSpy })

         expect(shop.controller).toHaveProperty("executeUseCase")
         expect(Object.keys(shop.controller.actions).length).toBeGreaterThan(0)
      })
   })

   describe("on the output side", () => {
      it("forwards immutable view models to the renderer", () => {
         const uiCalls: any[] = []
         let renderSpy = (viewModel: any) => {
            uiCalls.push(viewModel)
         }

         const sut = new ShopPresenter(renderSpy)

         sut.displayWelcome()

         expect(() => {
            uiCalls[0].welcomePage = {
               content: "Attempting to mutate you",
            }
         }).toThrowErrorMatchingInlineSnapshot(
            `"Cannot assign to read only property 'welcomePage' of object '#<Object>'"`
         )
      })
   })
})
