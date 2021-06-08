import { SeeWelcome } from "./SeeWelcome"
import { DisplaysWelcome } from "./interfaces/DisplaysWelcome"

describe("SeeWelcome use case", () => {
   let mockUi: DisplaysWelcome = {
      displayWelcome: jest.fn(),
   }

   beforeAll(() => {
      jest.clearAllMocks()
   })

   it("can be executed", () => {
      const useCase = new SeeWelcome(mockUi)

      expect(() => {
         useCase.execute()
      }).not.toThrow()
   })

   it("outputs welcome text to the presenter", () => {
      const useCase = new SeeWelcome(mockUi)

      useCase.execute()

      expect(mockUi.displayWelcome).toHaveBeenCalled()
   })

})
