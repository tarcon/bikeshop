import { SeeBikes } from "./SeeBikes"
import { aBike } from "../domain/Bike.fixture"
import { ProvidesBikes } from "./interfaces/ProvidesBikes"
import { DisplaysBikes } from "./interfaces/DisplaysBikes"
import { DisplaysLoading } from "./interfaces/DisplaysLoading"

const emptyBackendSpy = {
   fetchPurchasableBikes: jest.fn().mockResolvedValue([]),
} as ProvidesBikes

const backendSpy = {
   fetchPurchasableBikes: jest.fn().mockResolvedValue([aBike()]),
} as ProvidesBikes

const uiSpy = {
   displayBikes: jest.fn(),
   startLoading: jest.fn(),
   finishLoading: jest.fn(),
} as DisplaysBikes & DisplaysLoading

test("SeeBikes fetches bikes from backend", async () => {
   const useCase = new SeeBikes(emptyBackendSpy, uiSpy)

   await useCase.execute()

   expect(emptyBackendSpy.fetchPurchasableBikes).toHaveBeenCalled()
})

test("SeeBikes outputs to ui", async () => {
   const useCase = new SeeBikes(backendSpy, uiSpy)

   await useCase.execute()

   expect(uiSpy.displayBikes).toHaveBeenCalledWith([
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

   expect(uiSpy.displayBikes).toHaveBeenCalledWith([])
})
