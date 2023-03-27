import { useWindowDimensions, View } from "react-native"
import { kauriColors } from "../theme"
import { hexToRGBA } from "../utils/hexToRGBA"

export const LineSeparator = ({}) => {
    const {width:windowWidth} = useWindowDimensions()
    return (
        <View style={{marginHorizontal: 16, marginBottom:16,marginTop:32, width: windowWidth-32, height: 1.25, backgroundColor: hexToRGBA(kauriColors.primary.chipBar, 0.5)}}/>
    )
}