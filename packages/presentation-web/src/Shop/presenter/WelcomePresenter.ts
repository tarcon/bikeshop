import { DisplaysWelcome } from "../boundaries/DisplaysWelcome"
import { WelcomeViewModel } from "./WelcomeViewModel"

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
      return "Welcome to our online bikeshop with clean architecture. Order your bike in the knowledge that our digital systems are built in the technically most sustainable way imaginable."
   }
}
