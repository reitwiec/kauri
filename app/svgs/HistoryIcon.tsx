import { Path, Svg } from "react-native-svg"
import { View } from "react-native"

export const HistoryIcon = () => {
    return (
        <View style={{aspectRatio: 13/11}}>
            <Svg width="100%" height="100%" viewBox="0 0 13 11" fill="none">
                <Path d="M6.03614 9.49116C7.42884 10.0483 10.1214 10.0484 11.2357 7.26298C12.3499 4.47758 10.1217 2.50914 9.0075 2.06344C7.6148 1.50631 4.92222 1.50622 3.80796 4.29162L3.25083 5.68432" stroke="#3C3A38" strokeWidth="1.8" strokeLinecap="round"/>
                <Path d="M1.87775 2.79663L3.11363 5.75004L6.26629 5.19261" stroke="#3C3A38" strokeWidth="1.8" strokeLinecap="round"/>
            </Svg>
        </View>
    )
}