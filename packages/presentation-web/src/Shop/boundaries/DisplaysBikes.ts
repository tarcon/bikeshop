import { SeeBikesOutput } from "../use-cases/SeeBikesOutput"

export interface DisplaysBikes {
   showBikes(presentableBikes: SeeBikesOutput): any
}
