import Locked from './locked.svg'
import Unlocked from './unlocked.svg'
export const Lock = ({locked}) => {
    return (
        locked?<Locked/>:<Unlocked/>
    )
}