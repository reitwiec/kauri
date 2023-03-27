import React, { FC, useEffect, useState } from "react"
import {Image, Pressable, Text, TextStyle, useWindowDimensions, View, ViewStyle} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import type { resource } from "../../mockdata"
import { designSystem, kauriColors } from "../../theme"
import { hexToRGBA } from "../../utils/hexToRGBA"
import {translate as geti18n} from '../../i18n';
import { Hex } from "../../components/Hex"
import Animated, { Extrapolate, interpolate, SensorType, SharedValue, useAnimatedSensor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { ImpactDistribution, LineSeparator, TryBtn } from "../../components"
import { shadowGenerator } from "../../utils/shadowGenerator"
import { Path, Svg } from "react-native-svg"
import FastImage from "react-native-fast-image"

interface FeatureThumbnailProps {
    data: resource,
    progress: SharedValue<number>,
    onPress: (actionId: string) => void
}

const StaggeredHex = ({topCauses, totalCauses}) => {
    return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', width:'100%', marginBottom: 16}}>
                {
                    topCauses.map((cause, index)=>{
                        return (
                            <View key={index} style={{marginLeft: index>0?4:0, marginRight:4}}>
                                <Hex dimension={cause.dimension} title={null}/>
                            </View>
                            )
                        })   
                    }
                {
                    totalCauses - topCauses.length>0 && <View style={{marginLeft: 4}}>
                        <Hex dimension={"default"} title={null}/>
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...designSystem.textStyles.captionsBold, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                                +{`${totalCauses - topCauses.length}`}
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
    const desiredImageHeight = winWidth - 16*2
    const desiredImageWidth = (desiredImageHeight/imageHeight) * imageWidth
    const isPressing = useSharedValue(false)

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
                <View style={{...shadowGenerator(5), backgroundColor: kauriColors.secondary.lightBrown,width: desiredImageHeight+10, height: cardHeight+10, position: 'absolute',left:-5, top:-5, borderRadius:12}}>
                    <LinearGradient
                        style={{
                        borderRadius: 12,
                        width: desiredImageHeight+10, height: cardHeight+10 
                        }}
                        start={{x: 1, y: 1}}
                        end={{x: 0.5, y: 0}}
                        locations={[0, 0.2, 1]}
                        colors={['#755635', kauriColors.primary.yellow,  '#A28362']}
                    />
                </View>
                <View style={{width: desiredImageHeight, minHeight: desiredImageHeight, padding: 16, justifyContent: 'flex-end'}} onLayout={(e)=>{setCardHeight(e.nativeEvent.layout.height)}}>
                    <View style={{width: desiredImageHeight,overflow:"hidden", borderRadius: 12, position: 'absolute', top: 0}}>
                        <FastImage
                            source={url as any}
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
                    <View style={{alignItems: 'flex-start', marginTop: 88}}>
                        {type === 'habit'&& (
                            <View
                            style={{
                                borderRadius: 50,
                                backgroundColor: hexToRGBA(kauriColors.primary.seaGreen, 0.8),
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                alignItems: 'center',
                                marginBottom: 8
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
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{width: '80%'}}>
                                <Text style={{...designSystem.textStyles.titleBig, color: kauriColors.primary.light}}>
                                    {title}
                                </Text>
                            </View>
                            <View>
                                <TryBtn onPress={() => onPress(actionId+"")}/>
                            </View>
                        </View>
                    </View>
                    <Text 
                        style={{marginTop: 8, textAlign: 'left', width: '90%', color: kauriColors.primary.light, ...designSystem.textStyles.captions}} numberOfLines={2}>
                        {description}
                    </Text>

                    <View style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 24}}>
                        <StaggeredHex topCauses={topCauses} totalCauses={totalCauses}/>
                    </View>
                    <View style={{flexDirection: 'row', position: 'absolute', top: 0, left:0, backgroundColor: '#A28362', paddingHorizontal:8, paddingVertical:4, borderBottomRightRadius: 12}}>
                                <Animated.Text style={[{...designSystem.textStyles.smallTextsBold, color: kauriColors.primary.light}]}>
                                    {geti18n("actions.nextActionForYou").toUpperCase()}
                                </Animated.Text>
                        </View>
                    
                </View>
            </Pressable>
        </Animated.View>
    )
}
