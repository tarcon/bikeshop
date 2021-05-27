import { BikesPresenter } from "./BikesPresenter"

describe("Bike presenter", () => {
   it("generates empty view model for an empty store", () => {
      //given
      const testRenderFn = jest.fn()
      const sut = new BikesPresenter(testRenderFn)

      //when
      sut.showBikes([])

      //then
      expect(testRenderFn).toHaveBeenCalledWith([])
   })

   it("generates a view model for a bike", () => {
      //given
      const testRenderFn = jest.fn()
      const sut = new BikesPresenter(testRenderFn)

      //when
      sut.showBikes([
         {
            ean: 123,
            name: "Bike1",
            price: 1337,
            productImageFileName: "file.jpg",
            description: "Description 1",
         },
      ])

      //then
      expect(testRenderFn).toHaveBeenCalledWith([
         {
            ean: 123,
            name: "Bike1",
            price: "1.337,00 €",
            productImageUrl: "./img/file.jpg",
            description: "Description 1",
         },
      ])
   })
})
