import { FemaleLed } from "./FemaleLed"
import { RenewableEnergy } from "./RenewableEnergy"
import { VeganLifestyle } from "./VeganLifestyle"

export const CausesSelector = (cause:string) => {
    cause = cause.toLowerCase()
    switch (cause) {
        case 'female led': {
            return (<FemaleLed/>)
        }
        case 'renewable energy': {
            return (<RenewableEnergy/>)
        }
        case 'vegan lifestyle': {
            return (<VeganLifestyle/>)
        }
        default: {
            return (<FemaleLed/>)
        }


    }
}