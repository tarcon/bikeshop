import { DisplaysWelcome, SeeWelcome } from ".."

const ui = {
   showWelcome: jest.fn(),
} as DisplaysWelcome

test("SeeBikes fetches bikes from backend", async () => {
   const useCase = new SeeWelcome(ui)

   await useCase.execute()

   expect(ui.showWelcome).toHaveBeenCalled()
})
