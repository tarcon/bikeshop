import { DisplaysWelcome, SeeWelcome } from ".."

const uiSpy = {
   showWelcome: jest.fn(),
} as DisplaysWelcome

test("SeeBikes fetches bikes from backend", async () => {
   const useCase = new SeeWelcome(uiSpy)

   await useCase.execute()

   expect(uiSpy.showWelcome).toHaveBeenCalled()
})
