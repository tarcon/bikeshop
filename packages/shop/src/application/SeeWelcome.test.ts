import { SeeWelcome } from "./SeeWelcome"

const uiSpy = {
   displayWelcome: jest.fn(),
   startLoading: jest.fn(),
   finishLoading: jest.fn(),
}

test("SeeWelcome can be executed", async () => {
   const useCase = new SeeWelcome(uiSpy)

   expect(() => {
      useCase.execute()
   }).not.toThrow()
})
