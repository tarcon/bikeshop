import { Controller, UseCases } from "./Controller"

describe("Controller", () => {
   it("knows all use cases", () => {
      const useCases: UseCases = {
         someUseCase: {
            execute() {
               return "output"
            },
         },
         someOtherUseCase: {
            execute() {
               return "output"
            },
         },
      }

      const sut = new Controller(useCases)

      expect(sut.actions).toStrictEqual({
         someUseCase: {
            execute: expect.anything(),
         },
         someOtherUseCase: {
            execute: expect.anything(),
         },
      })
   })
})
