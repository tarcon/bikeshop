import { SeeWelcome } from "./SeeWelcome"
import { DisplaysWelcome } from "./interfaces/DisplaysWelcome"

const uiSpy = {
   displayWelcome: jest.fn(),
} as DisplaysWelcome

test("SeeBikes fetches bikes from backend", async () => {
   const useCase = new SeeWelcome(uiSpy)

   await useCase.execute()

   expect(uiSpy.displayWelcome).toHaveBeenCalled()
})
