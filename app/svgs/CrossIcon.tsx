import { Path, Svg } from "react-native-svg"
import { View } from "react-native"

export const CrossIcon = ({color}) => {
    return (
        <View style={{aspectRatio: 1}}>
            <Svg width="100%" height="100%" viewBox="0 0 10 10" fill="none">
                <Path d="M1.25 1.25L8.75 8.75" stroke={color} strokeWidth="2" strokeLinecap="round"/>
                <Path d="M8.75 1.25L1.25 8.75" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            </Svg>
        </View>
    )
}