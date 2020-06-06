import { SeeBikes } from "./SeeBikes"
import { aBike, DisplaysBikes, ProvidesBikes } from ".."

const emptyBackendSpy = {
   fetchPurchasableBikes: jest.fn().mockResolvedValue([]),
} as ProvidesBikes

const backendSpy = {
   fetchPurchasableBikes: jest.fn().mockResolvedValue([aBike()]),
} as ProvidesBikes

const uiSpy = {
   showBikes: jest.fn(),
} as DisplaysBikes

test("SeeBikes fetches bikes from backend", async () => {
   const useCase = new SeeBikes(emptyBackendSpy, uiSpy)

   await useCase.execute()

   expect(emptyBackendSpy.fetchPurchasableBikes).toHaveBeenCalled()
})

test("SeeBikes outputs to ui", async () => {
   const useCase = new SeeBikes(backendSpy, uiSpy)

   await useCase.execute()

   expect(uiSpy.showBikes).toHaveBeenCalledWith([
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
   const useCase = new SeeBikes(emptyBackendSpy, uiSpy)

   await useCase.execute()

   expect(uiSpy.showBikes).toHaveBeenCalledWith([])
})