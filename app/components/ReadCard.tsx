import type { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import {Text, Image, useWindowDimensions, ImageSourcePropType} from "react-native"
import { designSystem, kauriColors } from "../theme";
import { hexToRGBA } from "../utils/hexToRGBA";

interface ReadCardProps {
    image: ImageSourcePropType,
    title: string,
    description?:string,
    onPress: (readId: string) => void
}

export const ReadCard:FC<ReadCardProps> = ({image, title, description, onPress}) => { 
    const {width:windowWidth, height: windowHeight} = useWindowDimensions()
    const $pressing = useSharedValue(false)

    const $pressingAnim = useAnimatedStyle(()=>{
        return {
            transform: [{scale: $pressing.value?withTiming(0.98):withTiming(1)}]
        }
    }, [$pressing])
    return (
        <TouchableOpacity activeOpacity={0.9} onPressIn={()=> $pressing.value = true} onPressOut={()=> $pressing.value = false}  onPress={() => onPress("1")} style={{marginTop:24, paddingHorizontal: 24}}>
                    <Animated.View style={[{ overflow:'hidden' , backgroundColor: kauriColors.primary.light, width: windowWidth-48, height: 4*(windowWidth-48)/3, borderRadius:12}, $pressingAnim]}>
                                    <Animated.View style={[{backgroundColor: hexToRGBA("#25170E", 0.9), zIndex: 2, padding:16, position:'absolute', width:'100%'}, description?{bottom:0}:{top:0}]}>
                                            <Text style={{...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.chipBar}}>
                                            3 MIN READ
                                            </Text>
                                            <Text style={{...designSystem.textStyles.titleBigger, color: kauriColors.primary.light, width: '70%'}}>
                                                {title}
                                            </Text>
                                            {
                                                description && <Text style={{...designSystem.textStyles.captions, color: kauriColors.primary.chipBar}}>
                                                    {description}
                                                </Text>
                                            }
                                    </Animated.View>
                                        <Animated.View style={{width: windowWidth, height:4*windowWidth/3}}>
                                            <Image
                                                source={image}
                                                style={{width: '100%', height:'100%', resizeMode: 'cover'}}
                                            />
                                        </Animated.View>
                    </Animated.View>
         </TouchableOpacity>
    )
}