import React, { FC, useEffect, useState } from "react"
import {Image, Pressable, Text, TextStyle, useWindowDimensions, View, ViewStyle} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import type { resource } from "../../mockdata"
import { designSystem, kauriColors } from "../../theme"
import { hexToRGBA } from "../../utils/hexToRGBA"
import {translate as geti18n} from '../../i18n';
import { Hex } from "../../components/Hex"
import Animated, { Extrapolate, interpolate, SensorType, SharedValue, useAnimatedSensor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { ImpactDistribution, TryBtn } from "../../components"
import { shadowGenerator } from "../../utils/shadowGenerator"
import { Path, Svg } from "react-native-svg"

interface FeatureThumbnailProps {
    data: resource,
    progress: SharedValue<number>,
    onPress: (actionId: string) => void
}

const StaggeredHex = ({topCauses, totalCauses}) => {
    return (
<View style={{ marginBottom: 16, flex:1, height:64, marginLeft: 16}}>
                {
                    topCauses.map((cause, index)=>{
                        return (
                                <View style={{position: 'absolute', left: index*15}} key={index}>
                                    <Hex dimension={cause.dimension} title={null}/>
                                </View>
                            )
                        })   
                    }
                {
                    totalCauses - topCauses.length>0 && <View style={{position:'absolute',left: topCauses.length*15, top:0, bottom:0}}>
                            <Hex dimension={"default"} title={null}/>
                            <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 0, right:0, left:0}}>
                                <Text style={{...designSystem.textStyles.captionsBold, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                                    +{totalCauses - topCauses.length}
                                </Text>
                            </View>
                    </View>
                }
            </View>
    )
}

interface ArrowProps {
    start: number,
    end: number,
    progress: SharedValue<number>
}

const Arrow:FC<ArrowProps> = ({start, end, progress}) => {
    const $animatedStyles = {
        progress: useAnimatedStyle(()=>{
            const opacity = interpolate(
                progress.value,
                [start,start+(start-end)/2, end],
                [0.2,1,0.2],
                Extrapolate.CLAMP
            )

            const scale = interpolate(
                progress.value,
                [start,start+(start-end)/2, end],
                [1, 1.2, 1],
                Extrapolate.CLAMP
            )

            const translateY = interpolate(
                progress.value,
                [start,start+(start-end)/2, end],
                [0, 2, 0],
                Extrapolate.CLAMP
            )
            return {
                opacity,
                transform:[{rotate: '-90deg'},{scale}, {translateY}],
            }
        }, [progress.value])
    }
    return (
        <Animated.View style={[$animatedStyles.progress, {alignItems: 'center', justifyContent: 'center'}]}>
                        <Svg width="13" height="6" viewBox="0 0 13 6" fill="none">
                            <Path d="M1 1L6.5 5L12 1" stroke={kauriColors.primary.yellow} strokeLinecap="round" strokeWidth={2}/>
                        </Svg>
        </Animated.View>
    )
}

export const FeatureThumbnail:FC<FeatureThumbnailProps> = ({data, progress, onPress}) =>{
    const {id:actionId, url, title, type, impactDist, description, topCauses, totalCauses} = data
    const winWidth = useWindowDimensions().width
    let {width: imageWidth, height: imageHeight} = Image.resolveAssetSource(url);
    const arrows = [0,1,2]
    const delta = 1/arrows.length
    const desiredImageHeight = winWidth - 24*2 - 8*2
    const desiredImageWidth = (desiredImageHeight/imageHeight) * imageWidth
    const isPressing = useSharedValue(false)
    // const rotateX = useSharedValue(0)
    // const rotateY = useSharedValue(0)

    // const sensor = useAnimatedSensor(SensorType.ROTATION, {interval: 300})

    // const cardStyle = useAnimatedStyle(()=>{
    //     const {yaw, pitch, roll} = sensor.sensor.value;
    //     //{z, y, x}
    //     //{--, 1.5, 0}
    //      //{--, 0.8,-0.3} top left
    //      //{--, 0.8, 0.3} top right
    //      //{--, 1.3, -2.4} bottom left
    //      //{---, 1,3, 2.4} bottom right
    //     // w= windowWidth - 32 h= desireImpageHeight
    //     console.log(yaw.toFixed(2), pitch.toFixed(2), roll.toFixed(2))
        

    //     rotateX.value = interpolate(
    //         pitch,
    //         [0.8, 1.3],
    //         [10, -10],
    //         Extrapolate.CLAMP
    //     )

    //     rotateY.value = interpolate(
    //         roll,
    //         [-2.4, 2.4],
    //         [-10, 10],
    //         Extrapolate.CLAMP
    //     )
    //     return {transform:[
    //         {perspective: 300},
    //         {rotateX: `${rotateX.value}deg`},
    //         {rotateY: `${rotateY.value}deg`}
    //     ]}
    // }, [sensor])

    const $animatedStyles = {
        scale: useAnimatedStyle(()=>{
            return {
                transform: [{scale: isPressing.value?withTiming(0.98):withTiming(1)}]
            }
        }, [isPressing]),
        progress: useAnimatedStyle(()=>{
            const opacity = interpolate(
                progress.value,
                [delta, 2*delta],
                [0.5,1],
                Extrapolate.CLAMP
            )
            return {
                opacity,
            }
        }, [progress.value])
    }

    // topLeft (10deg, -10deg)
    // topRight (10deg, 10deg)
    // bottomRight (-10deg, 10deg)
    // bottomLeft (-10deg, -10deg)

    // useEffect(() => {
    //     console.log('something updated')
    // }, [])

    const [cardHeight, setCardHeight] = useState(desiredImageHeight)
    return (
        <Animated.View style={{...$animatedStyles.scale}}>
            <Pressable
                onPressIn={()=>{
                    isPressing.value = true
                }}
                onPressOut={()=>{
                    if(isPressing.value === true){
                        isPressing.value = false
                    }
                }}
                onPress={()=>{
                    //change to take string by default
                    onPress(actionId+"")
                }}
            >
                <View style={{...shadowGenerator(5), backgroundColor: kauriColors.secondary.lightBrown,width: desiredImageHeight+8, height: cardHeight+8, position: 'absolute',left:-4, top:-4, borderRadius:12}}>
                    <LinearGradient
                        style={{
                        borderRadius: 12,
                        width: desiredImageHeight+8, height: cardHeight+8 
                        }}
                        start={{x: 1, y: 1}}
                        end={{x: 0.5, y: 0}}
                        colors={['rgba(92,58,36,0.8)', kauriColors.primary.yellow,  'rgba(92,58,36, 0.25)']}
                    />
                </View>
                <View style={{width: desiredImageHeight, minHeight: desiredImageHeight, padding: 16, justifyContent: 'flex-end'}} onLayout={(e)=>{setCardHeight(e.nativeEvent.layout.height)}}>
                    <View style={{width: desiredImageHeight,overflow:"hidden", borderRadius: 12, position: 'absolute', top: 0}}>
                        <Image
                            source={url}
                            style={{
                                flex: 1,
                                width: desiredImageWidth,
                                height: desiredImageHeight,
                            }}
                            />
                        <View
                            style={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            position: 'absolute',
                            }}
                        />
                        <LinearGradient
                            style={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                            flex: 1,
                            position: 'absolute',
                            }}
                            start={{x: 0.5, y: 1}}
                            end={{x: 0.5, y: 0}}
                            colors={['rgba(92,58,36,0.75)', 'rgba(92,58,36,0)']}
                        />
                    </View>
                    <LinearGradient
                            style={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                            flex: 1,
                            position: 'absolute',
                            borderRadius: 12
                            }}
                            locations={[0, 0.7, 1]}
                            start={{x: 0.5, y: 0.7}}
                            end={{x: 0.5, y: 0}}
                            colors={['rgba(37,23,12,1)', 'rgba(37,23,12,0.64)', 'rgba(37,23,12,0)']}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 88, marginHorizontal:24}}>
                        <View style={{width: '70%'}}>
                        <Text style={{...designSystem.textStyles.titleBig, color: kauriColors.primary.light, lineHeight: 24}}>
                            {title}
                        </Text>
                        </View>
                        {type === 'habit'&& (
                            <View
                            style={{
                                borderRadius: 50,
                                backgroundColor: hexToRGBA(kauriColors.primary.seaGreen, 0.8),
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                marginHorizontal: 24
                            }}>
                            <Text
                                style={{
                                color: kauriColors.primary.light,
                                ...designSystem.textStyles.smallTexts,
                                }}>
                                {geti18n('common.habit')}
                            </Text>
                            </View>
                        )}
                    </View>
                    {
                    impactDist && <ImpactDistribution impactDist={impactDist} style={"light"}/>}
                    <Text 
                        style={{marginTop: 8, textAlign: 'center',paddingHorizontal: 16, color: kauriColors.primary.light, ...designSystem.textStyles.captions}} numberOfLines={2}>
                        {description}
                    </Text>

                    <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: 24}}>
                        <TryBtn onPress={() => onPress(actionId+"")}/>
                        <StaggeredHex topCauses={topCauses} totalCauses={totalCauses}/>
                    </View>
                    <View style={{flexDirection: 'row', width: '100%', position: 'absolute', top: 8, left:8}}>
                                    {
                                        arrows.map((i)=>{
                                            const end = i * delta
                                            const start = (i+1)*delta
                                            return (
                                                <Arrow start={start}  end={end} progress={progress} key={i}/>
                                            )
                                        })
                                    }
                                <Animated.Text style={[{...designSystem.textStyles.captionsBold, color: kauriColors.primary.light, marginLeft: 8}, $animatedStyles.progress]}>
                                    {geti18n("actions.nextActionForYou")}
                                </Animated.Text>
                        </View>
                    
                </View>
            </Pressable>
        </Animated.View>
    )
}
