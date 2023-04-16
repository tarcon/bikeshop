import { ShopPresenter } from "./ShopPresenter"

describe("ShopPresenter", function () {
   let renderSpy = jest.fn()

   describe("for welcome", () => {
      beforeEach(() => {
         jest.clearAllMocks()
      })

      it("generates a view model which contains the welcome string", () => {
         const sut = new ShopPresenter(renderSpy)

         sut.displayWelcome()

         expect(renderSpy).toHaveBeenLastCalledWith({
            global: { isLoading: true },
            welcomePage: {
               content: expect.stringContaining("Welcome"),
            },
         })
      })
   })

   describe("for bike list", () => {
      beforeEach(() => {
         jest.clearAllMocks()
      })

      it("can display empty bikes list after showing the welcome", () => {
         const sut = new ShopPresenter(renderSpy)

         sut.displayWelcome()
         sut.displayBikes([])

         expect(renderSpy.mock.calls).toStrictEqual([
            [
               {
                  global: { isLoading: true },
                  welcomePage: {
                     content: expect.stringContaining("Welcome"),
                  },
               },
            ],
            [
               {
                  global: { isLoading: true },
                  bikesPage: { bikes: [] },
               },
            ],
         ])
      })
   })
})
