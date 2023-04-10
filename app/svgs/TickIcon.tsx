
import { Path, Svg } from 'react-native-svg'
import { View } from 'react-native'
export const TickIcon = ({color}) => {
    return (
        <View style={{aspectRatio: 25/17}}>
            <Svg width="100%" height="100%" viewBox="0 0 25 17" fill="none" >
                <Path d="M1.5 8.5L8.88889 15.6087L24 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        </View>
    )
}