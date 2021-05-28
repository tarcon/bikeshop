import { DisplaysWelcome } from "./interfaces/DisplaysWelcome"

export class SeeWelcome {
   private _ui: DisplaysWelcome

   constructor(ui: DisplaysWelcome) {
      this._ui = ui
   }

   execute() {
      this._ui.displayWelcome()
   }
}
