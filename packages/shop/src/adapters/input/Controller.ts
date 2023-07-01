import { AbstractUseCase } from "../../application/UseCase"

export type UseCases = Record<string, AbstractUseCase>

export class Controller {
   constructor(public readonly actions: UseCases) {}

   public executeUseCase(useCaseName: string, input?: any) {
      this.actions[useCaseName].execute(input)
   }
}
