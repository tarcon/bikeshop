import { SeeBikes } from "./SeeBikes"
import { aBike, DisplaysBikes, ProvidesBikes } from ".."

const emptyBackend = {
   fetchPurchasableBikes: jest.fn().mockResolvedValue([]),
} as ProvidesBikes

const backend = {
   fetchPurchasableBikes: jest.fn().mockResolvedValue([aBike()]),
} as ProvidesBikes

const ui = {
   showBikes: jest.fn(),
} as DisplaysBikes

test("SeeBikes fetches bikes from backend", async () => {
   const useCase = new SeeBikes(emptyBackend, ui)

   await useCase.execute()

   expect(emptyBackend.fetchPurchasableBikes).toHaveBeenCalled()
})

test("SeeBikes outputs to ui", async () => {
   const useCase = new SeeBikes(backend, ui)

   await useCase.execute()

   expect(ui.showBikes).toHaveBeenCalledWith([
      {
         ean: expect.anything(),
         name: expect.anything(),
         price: expect.anything(),
         productImageFileName: expect.anything(),
         description: expect.anything(),
      },
   ])
})

test("SeeBikes outputs empty to ui if no bikes present in backend", async () => {
   const useCase = new SeeBikes(emptyBackend, ui)

   await useCase.execute()

   expect(ui.showBikes).toHaveBeenCalledWith([])
})
