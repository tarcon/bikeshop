type UseCaseInputType = Record<string, any> | undefined
type UseCaseOutputType = Record<string, any> | string | void

export abstract class AbstractUseCase {
   public abstract execute(input?: UseCaseInputType): Promise<UseCaseOutputType> | UseCaseOutputType
}