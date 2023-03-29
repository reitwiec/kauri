import { Circle, G, Mask, Path, Svg } from 'react-native-svg';
import { Platform, View } from 'react-native';
import { kauriColors } from '../theme';
import Animated, { Easing, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import type { FC } from 'react';

interface AssistantIconProps {
  active?: boolean;
}
export const AssistantIcon:FC<AssistantIconProps> = ({active}) => {
    const color  = kauriColors.primary.yellow
    const $opacityStyle = useAnimatedStyle(()=>{
        return {
            opacity: active? withTiming(1): withTiming(0.45),
            ...(Platform.OS==='ios' && {
                transform: [{
                    scale: active? withTiming(1.2, {easing: Easing.inOut(Easing.ease)}): withTiming(1, {easing: Easing.inOut(Easing.ease)})
                }]
            })
        }
    }, [active])
  return (
    <View style={[{backgroundColor: '#fff', borderRadius:50, padding:2}]}>
        <Animated.View style={[$opacityStyle]}>
            <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <Circle cx="32" cy="32" r="28" stroke={color} strokeOpacity="0.8" strokeWidth="2"/>
                <Mask id="Mask0_1058_8176" maskUnits="userSpaceOnUse" x="4" y="4" width="56" height="56">
                <Circle cx="32" cy="32" r="24" fill="#D9D9D9"/>
                </Mask>
                <G mask="url(#Mask0_1058_8176)">
                    <Path d="M7.68281 30.6215C5.80672 32.1783 6.07342 35.5327 6.44128 37.0153L4.92383 42.1581L13.3387 58.4205L23.2709 62.7293L48.1016 56.4746L63 42.1581C62.0804 39.7488 60.2411 34.0686 60.2411 30.6215C60.2411 26.3127 56.7924 17 54.4472 17C52.1021 17 51.6883 18.3899 50.7226 18.5289C49.757 18.6679 41.2042 25.3397 37.4796 26.8686C33.755 28.3976 21.7535 28.9536 18.4428 28.9536C15.132 28.9536 10.0279 28.6756 7.68281 30.6215Z" fill={color} fillOpacity="0.25"/>
                    <Path d="M9.47622 19.085C7.82084 19.5298 5.93555 23.4402 5.19982 25.3398H0.923428L-0.456055 43.8261L12.9249 66.0653L58.3099 56.7527L57.6202 42.8532C53.7576 43.0848 43.9357 42.6864 35.5484 39.2393C25.0644 34.9305 17.7531 24.6448 16.6495 23.3939C15.5459 22.1429 11.5454 18.5291 9.47622 19.085Z" fill={color} fillOpacity="0.25"/>
                    <Path d="M10.8558 33.5402C8.53826 40.7679 11.2696 49.154 12.925 52.4435L27.9614 66.065L52.3782 55.3624C53.1599 56.5207 54.7785 56.0852 54.9992 45.0768C55.2751 31.3163 46.4464 21.5866 39.549 20.1967C32.6516 18.8067 29.7547 19.6407 27.4096 20.1967C25.0645 20.7527 13.7527 24.5055 10.8558 33.5402Z" fill={color} fillOpacity="0.25"/>
                    <Path d="M9.20032 27.0075C6.55172 28.6754 3.90803 35.1004 4 37L3.82031 40.907L17.891 61.6173L56.7924 57.3084L61.0688 44.1039C60.517 42.4823 58.8892 39.2947 56.7924 39.5171C54.1714 39.7951 47.274 37.5711 37.3417 29.7874C27.4095 22.0037 22.8572 23.8106 19.2705 23.6716C15.6839 23.5326 12.5111 24.9226 9.20032 27.0075Z" fill={color} fillOpacity="0.55"/>
                </G>
            </Svg>
        </Animated.View>
    </View>
  );
};