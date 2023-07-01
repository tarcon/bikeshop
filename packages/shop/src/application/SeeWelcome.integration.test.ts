import { SeeWelcome } from "./SeeWelcome"
import { ShopPresenter } from "../adapters/output/ShopPresenter"

describe("SeeWelcome use case", () => {
   it("can be executed", () => {
      const presenter: ShopPresenter = new ShopPresenter(jest.fn())
      const useCase = new SeeWelcome(presenter)

      expect(() => {
         useCase.execute()
      }).not.toThrow()
   })

   it("displays welcome text after visualizing a loading state", () => {
      const renderSpy = jest.fn()
      const presenter: ShopPresenter = new ShopPresenter(renderSpy)
      const sut = new SeeWelcome(presenter)

      sut.execute()

      expect(renderSpy.mock.calls).toStrictEqual([
         [
            {
               global: { isLoading: true },
            },
         ],
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
               global: { isLoading: false },
               welcomePage: {
                  content: expect.stringContaining("Welcome"),
               },
            },
         ],
      ])
   })
})
