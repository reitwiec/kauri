import { FC, useState } from "react"
import {Image, Pressable, Text, TextStyle, useWindowDimensions, View, ViewStyle} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import type { resource } from "../../mockdata"
import { designSystem, kauriColors } from "../../theme"
import { hexToRGBA } from "../../utils/hexToRGBA"
import {translate as geti18n} from '../../i18n';
import ImpactMinimal from '../../svgs/ImpactIcons/impact.minimal.svg';
import ExpenseHigh from '../../svgs/ImpactIcons/expense.high.svg';
import EffortMinimal from '../../svgs/ImpactIcons/effort.minimal.svg';
import { Hex } from "../../components/Hex"
import Animated, { SensorType, useAnimatedSensor, useAnimatedStyle } from "react-native-reanimated"

interface FeatureThumbnailProps {
    data: resource
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
export const FeatureThumbnail:FC<FeatureThumbnailProps> = ({data}) =>{
    const {url, title, type, impactDist, description, topCauses, totalCauses} = data
    const winWidth = useWindowDimensions().width
    let {width: imageWidth, height: imageHeight} = Image.resolveAssetSource(url);
    const desiredImageHeight = winWidth - 24*2 - 8*2
    const desiredImageWidth = (desiredImageHeight/imageHeight) * imageWidth
    const impactMap = {
        impact: {
            minimal: <ImpactMinimal/>
        },
        expense: {
            high: <ExpenseHigh/>
        },
        effort:{
            minimal: <EffortMinimal/>
        }
    }

    const sensor = useAnimatedSensor(SensorType.GYROSCOPE, {interval: 500})

    const cardStyle = useAnimatedStyle(()=>{
        const {x:rotX, y:rotY} = sensor.sensor.value;
        console.log(rotX.toFixed(2), rotY.toFixed(2))

        return {transform:[
            {perspective: 300},
            {rotateX: '1deg'},
            {rotateY: '-1deg'}
        ]}
    })

    // topLeft (10deg, -10deg)
    // topRight (10deg, 10deg)
    // bottomRight (-10deg, 10deg)
    // bottomLeft (-10deg, -10deg)

    const [cardHeight, setCardHeight] = useState(desiredImageHeight)
    return (
        <Animated.View style={{}}>
            <View style={{width: desiredImageHeight+8, height: cardHeight+8, position: 'absolute',left:-4, top:-4, borderRadius:12}}>
                <LinearGradient
                    style={{
                    borderRadius: 12,
                    width: desiredImageHeight+8, height: cardHeight+8 
                    }}
                    start={{x: 1, y: 1}}
                    end={{x: 0.5, y: 0}}
                    colors={['rgba(92,58,36,0.8)', 'rgba(92,58,36, 0.25)']}
                />
            </View>
            <View style={{width: desiredImageHeight, minHeight: desiredImageHeight, padding: 16, justifyContent: 'flex-end'}} onLayout={(e)=>{setCardHeight(e.nativeEvent.layout.height)}}>
                <View style={{width: desiredImageHeight, overflow: 'hidden', borderRadius: 12, position: 'absolute', top: 0}}>
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
                    <Text style={{...designSystem.textStyles.title, color: kauriColors.primary.light, lineHeight: 24}}>
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
                impactDist && <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 24, marginTop: 24}}>
                    <View style={$impactIcon}>
                        {impactMap.impact[impactDist?.impact]}
                        <Text style={$impactIconText}>
                            {geti18n(`common.${impactDist?.impact}`)}
                        </Text>
                        <Text style={$impactIconSubText}>
                            {geti18n('common.impact')}
                        </Text>
                    </View>
                    <View style={$impactIcon}>
                        {impactMap.expense[impactDist?.expense]}
                        <Text style={$impactIconText}>
                            {geti18n(`common.${impactDist?.expense}`)}
                        </Text>
                        <Text style={$impactIconSubText}>
                            {geti18n('common.expense')}
                        </Text>
                    </View>
                    <View style={$impactIcon}>
                        {impactMap.effort[impactDist?.effort]}
                        <Text style={$impactIconText}>
                            {geti18n(`common.${impactDist?.effort}`)}
                        </Text>
                        <Text style={$impactIconSubText}>
                            {geti18n('common.effort')}
                        </Text>
                    </View>
                    </View>
                }
                <Text 
                    style={{marginTop: 8, textAlign: 'center',paddingHorizontal: 16, color: kauriColors.primary.light, ...designSystem.textStyles.captions}} numberOfLines={2}>
                    {description}
                </Text>

                <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: 24}}>
                    <Pressable style={{...$nextBtn, backgroundColor: kauriColors.secondary.lightBrown, flex:1}}>
                        <Text style={{color: kauriColors.primary.light, ...designSystem.textStyles.captionsBold}}>
                            {geti18n("common.try")}
                        </Text>
                    </Pressable>
                    <StaggeredHex topCauses={topCauses} totalCauses={totalCauses}/>
                    
                </View>
                
            </View>
        </Animated.View>
    )
}

const $impactIcon:ViewStyle = {
    alignItems: 'center'
}

const $impactIconText:TextStyle = {
    marginTop: 8,
    ...designSystem.textStyles.smallSerifBigger,
    color: kauriColors.primary.light
}

const $impactIconSubText:TextStyle = {
    ...designSystem.textStyles.smallSerif,
    color: kauriColors.primary.light,
    textTransform: 'lowercase',
}
const $nextBtn:ViewStyle = {
    flex:1,
    margin: 16,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12
}