import type { FC } from "react"
import { Extrapolate, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"
import {Text, TouchableOpacity, View} from 'react-native'
import Animated from "react-native-reanimated"
import { BackArrow } from "../svgs"
import { designSystem, kauriColors } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

interface HeaderProps{
    backTitle: string,
    onBackPress: () => void,
    title: string,
    translationY: SharedValue<number>
}
export const Header:FC<HeaderProps> = ({backTitle, onBackPress, title, translationY}) => {
    const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom"]);
    const $headerAnim = useAnimatedStyle(()=>{
        const opacity = interpolate(translationY.value, [0, 150], [0,1], Extrapolate.CLAMP)
        const translateY = interpolate(translationY.value, [0, 150], [-10, 0], Extrapolate.CLAMP)
        return {
            opacity: opacity,
            transform: [
                {translateY}
            ]
        }
    }, [translationY])

    const $headerAnimReverse = useAnimatedStyle(()=>{
        const opacity = interpolate(translationY.value, [0, 150], [1,0], Extrapolate.CLAMP)
        return {
            opacity: opacity
        }
    }, [translationY])
    return (
        <View style={{position: 'absolute', top:$containerInsets.paddingTop, width: '100%'}}>
            <Animated.View style={[$headerAnim, {width: '100%',height: 32, backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center'}]}>
                <Text style={{...designSystem.textStyles.smallTextsBold,textAlign: 'center', color: kauriColors.primary.unselectedLight}} numberOfLines={1}>
                    {title}
                </Text>
            </Animated.View>
            <Animated.View style={[$headerAnimReverse, {position:'absolute',top:0, left:16, height: 32, justifyContent: 'center'}]}>
                <TouchableOpacity 
                                onPress={()=>{onBackPress()}}
                                activeOpacity={0.9} 
                                style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{height:12, marginRight:8}}>
                                    <BackArrow color={kauriColors.primary.dark} alt/>
                                </View>
                                <Text style={{...designSystem.textStyles.captionsBold, color: kauriColors.primary.dark}}>
                                    {backTitle}
                                </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
)
}