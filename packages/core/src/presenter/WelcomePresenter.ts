import { WelcomeViewModel } from "./WelcomeViewModel"
import { DisplaysWelcome } from ".."

export class WelcomePresenter implements DisplaysWelcome {
   private _renderFn: (viewModel: WelcomeViewModel) => void

   constructor(renderFn: (viewModel: WelcomeViewModel) => void) {
      this._renderFn = renderFn
   }

   showWelcome(): any {
      const viewModel = {
         welcomeText: WelcomePresenter.createWelcomeText(),
      }
      this._renderFn(viewModel)
   }

   private static createWelcomeText() {
      return "Welcome to our online bikeshop with clean architecture. Order your bike, assured that our digital systems are built in the technically most sustainable way imaginable."
   }
}
