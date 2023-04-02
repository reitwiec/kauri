import { memo, useEffect } from "react"
import { Text, useWindowDimensions, View } from "react-native"
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated"
import { opacity } from "react-native-redash"
import { KauriLogo } from "../svgs"
import { kauriColors } from "../theme"

export const BusyIndicator = memo(({style, hideLogo}:{style: 'dark' | 'light', hideLogo?:boolean}) => {
    const {height: windowHeight} = useWindowDimensions()
    const progress = useSharedValue(0)
    const $loadingAnim = useAnimatedStyle(()=>{
        return {
            transform: [{
                scale: interpolate(progress.value, [0, 1], [1, 40/30], Extrapolate.CLAMP),
            }],
            opacity: interpolate(progress.value, [0, 0.5, 1], [0, 1, 0 ], Extrapolate.CLAMP)
        }
    })
    useEffect(() => {
      progress.value = withRepeat( withTiming(1, {duration: 1200,easing: Easing.cubic}), -1)
    }, [])
    
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', height: windowHeight/2}}>
            <View style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                <Animated.View style={[{borderWidth:2, borderColor: "#EBBC38", borderRadius: 20, width: 30, height: 30}, $loadingAnim]}/>
            </View>
            {!hideLogo && <View style={{width: 100}}>
                <KauriLogo textColor={style==='dark'?'#fff':kauriColors.primary.dark}/>
            </View>}
        </View>
    )
})