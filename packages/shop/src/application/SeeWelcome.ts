import { DisplaysWelcome } from "./interfaces/DisplaysWelcome"
import { DisplaysLoading } from "./interfaces/DisplaysLoading"

export class SeeWelcome {
   constructor(private readonly _ui: DisplaysWelcome & DisplaysLoading) {}

   execute() {
      this._ui.startLoading()
      this._ui.displayWelcome()
      this._ui.finishLoading()
   }
}
