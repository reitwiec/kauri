import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native";
import Animated, { Easing, interpolate, runOnJS, SharedValue, useAnimatedReaction, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { designSystem, kauriColors } from "../../theme";
import { translate as geti18n } from "../../i18n"
import { hexToRGBA } from "../../utils/hexToRGBA";
import { PositiveFocusIcon } from "../../svgs";
import LinearGradient from 'react-native-linear-gradient';
import { getMostImpacted, roadMap } from "../../mockdata";
import { dimensionColorMap } from "../../utils/hexDetails";
import { StylisedTitle, Thumbnail, TryBtn } from "../../components";
import { Directions, FlatList, Gesture, GestureDetector, gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Hex } from "../../components/Hex";
import { shadowGenerator } from "../../utils/shadowGenerator";

export interface OverviewProps {
    riveHeight: number,
    Greeting: ({}: {}) => JSX.Element,
    userData: any, //need to add user data type
}

const WhatNext = React.memo(gestureHandlerRootHOC(({}) => {
    const activeIndexVal = useSharedValue(0)
    const THUMBNAIL_WIDTH = 144
    const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(()=>{
        if(activeIndexVal.value === roadMap.count-1){
            return
        }
        activeIndexVal.value += 1
    });
    
    const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(()=>{
        if(activeIndexVal.value === 0){
            return
        }
        activeIndexVal.value -= 1
    });


    const [activeIndex, setActiveIndex] = useState(0)
    const [currentItem, setCurrentItem] = useState<any>(null)

    const updateCurrent = (val) =>{
       setActiveIndex(val)
       if(val < roadMap.resources.length){
            setCurrentItem(roadMap.resources[val])
       }
    }
    
    useAnimatedReaction(()=>{
        runOnJS(updateCurrent)(activeIndexVal.value)
        return null
     },()=>{
     })
    
    const flingGesture = Gesture.Race(flingLeft, flingRight)
    const renderItem = useCallback(({item, index}) =>{
        return(
                <RoadmapThumbs item={item} index={index} key={index} activeIndexVal={activeIndexVal} activeIndex={activeIndex} THUMBNAIL_WIDTH={THUMBNAIL_WIDTH}/>
        )
    },[])
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <GestureDetector gesture={flingGesture}>
                <FlatList
                    maxToRenderPerBatch={4}
                    data={roadMap.resources}
                    contentContainerStyle={{
                        overflow: 'hidden',
                        width: '100%',
                        height: THUMBNAIL_WIDTH*1.5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    // removeClippedSubviews={true}
                    scrollEnabled={true}
                    horizontal
                    bounces={false}
                    showsHorizontalScrollIndicator={true}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                />
            </GestureDetector>

            {currentItem && <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: "80%", marginBottom: 16, paddingHorizontal:16}}>
                {
                    currentItem.topCauses.map((cause, index)=>{
                        return (
                                <Hex dimension={cause.dimension} title={null} key={index}/>
                            )
                        })   
                    }
                {
                    currentItem.totalCauses - currentItem.topCauses.length>0 && <View>
                        <Hex dimension={"default"} title={null}/>
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...designSystem.textStyles.captionsBold, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                                +{currentItem.totalCauses - currentItem.topCauses.length}
                            </Text>
                        </View>
                    </View>
                }
            </View>}
            {currentItem && <Text 
                style={{textAlign: 'center',paddingHorizontal: 16, width: "90%", color: hexToRGBA(kauriColors.primary.dark, 0.7), ...designSystem.textStyles.captions}} numberOfLines={2}>
                {currentItem.description}
            </Text>}
            <View style={{flexDirection: "row", justifyContent: 'space-evenly', paddingHorizontal: 16}}>
                <TryBtn/>
                <Pressable style={{...$nextBtn, borderColor: kauriColors.primary.light, borderWidth:2}}>
                    <Text style={{color: hexToRGBA(kauriColors.primary.dark,0.7), ...designSystem.textStyles.captionsBold}}>
                    {geti18n("common.seeAll")} (86)
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}))

interface RoadmapThumbsProps {
    item: any,
    index: number,
    activeIndexVal: SharedValue<number>,
    THUMBNAIL_WIDTH: number,
    activeIndex: number
}

const RoadmapThumbs:FC<RoadmapThumbsProps> = React.memo(function roadmapThumbs({item, index, activeIndexVal, THUMBNAIL_WIDTH, activeIndex}){
    const winWidth = useWindowDimensions().width
    const inputRange = [index -1, index, index+1]
    const isPressing = useSharedValue(false)
    const $animStyle = useAnimatedStyle(()=>{
        const absDifference = Math.abs(activeIndexVal.value - index);
        const delay = absDifference*100
        if(absDifference<=2){
            return {
                useNativeDriver:true,
                transform: [
                    {translateX: withTiming(interpolate(activeIndexVal.value, inputRange, [winWidth/2,0,-winWidth/2]), {duration: 450, easing: Easing.inOut(Easing.ease)})},
                    {translateY:  withTiming(interpolate(activeIndexVal.value, inputRange, [12,0,12]), {duration: 450, easing: Easing.inOut(Easing.ease)})},
                    {scale: isPressing.value?withTiming(0.98):withTiming(interpolate(activeIndexVal.value, inputRange, [0.92, 1, 0.92]), {duration: 450, easing: Easing.inOut(Easing.ease)})}
                ],
                opacity: withDelay(delay,withTiming(interpolate(activeIndexVal.value, inputRange, [1/4, 1, 1/4]), {duration: 450, easing: Easing.inOut(Easing.ease)})),
            }
        }else{
            return { 
                useNativeDriver:true,
                transform: [
                    {translateX: interpolate(activeIndexVal.value, inputRange, [winWidth/2,0,-winWidth/2])},
                    {translateY: interpolate(activeIndexVal.value, inputRange, [12,0,12])},
                    {scale: isPressing.value?withTiming(0.98):interpolate(activeIndexVal.value, inputRange, [0.92, 1, 0.92])}
                ],
                opacity:interpolate(activeIndexVal.value, inputRange, [1/4, 1, 1/4]),
            }
        }
    }, [activeIndexVal, isPressing])

    return (
        <TouchableOpacity activeOpacity={0.9} onPressIn={()=>{
            if(index === activeIndexVal.value){
                isPressing.value = true
            }
        }}
        onPressOut={()=>{
            if(isPressing.value === true){
                isPressing.value = false
            }
        }}
        onPress={()=>{
            if(index === activeIndexVal.value){
                console.log("on press")
            }
        }}
        style={[{
            ...shadowGenerator(5)
        }]}
        >
            <View style={[{width: "100%", alignItems: 'center', justifyContent: 'center'}]}>
                <Animated.View style={[{position: 'absolute'}, $animStyle]}>
                        <Thumbnail src={item.url} width={THUMBNAIL_WIDTH} height={THUMBNAIL_WIDTH} title={item.title} type={"large"} actionType={item.type} activeIndexVal={activeIndexVal} index={index} pretty={true} stacked={true} status={item.status}/>
                </Animated.View> 
            </View>
        </TouchableOpacity>
    )
})

export const Overview:FC<OverviewProps> = observer(function overview({riveHeight, Greeting, userData}){
    const windowWidth = useWindowDimensions().width
    const mostImpacted = getMostImpacted(3)
    const ProgressBar = ({width}) =>{
        const widthVal = useSharedValue(0)
        useEffect(() => {
          widthVal.value = withTiming(width, {
            duration: 450,
            easing: Easing.inOut(Easing.ease)
          })
        }, [])
        
        const height = 6

        const progressAnim = useAnimatedStyle(()=>{
            return {
                width: `${widthVal.value}%`
            }
        }, [widthVal])
        return (
            <View
                style={{
                    width: '100%',
                    height: height,
                    backgroundColor: 'rgba(251, 210, 93, 0.15)',
                    borderRadius: height,
                    overflow: 'hidden',
                }}
            >
                <Animated.View
                    style={[{
                        height: height,
                        backgroundColor: 'rgba(251, 210, 93, 1)',
                        borderRadius: height,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }, progressAnim]}
                />
            </View>
        )
    }

    const ContributionBar = ({contributions, totalContributions}) => {
        const height = 6
        let previousContribution = 0;
        return (
            <View
            style={{
                width: '100%',
                height: height,
                backgroundColor: 'transparent',
                borderRadius: height,
                overflow: 'hidden',
            }}
        >
            {
                contributions.map((contribution, index)=>{
                    const contributionPercentage = contribution.value*100/totalContributions 
                    const width = previousContribution + contribution.value*100/totalContributions;
                    const tempPrevContribution = previousContribution
                    previousContribution = width;
                    return (<Animated.View
                    key={index}
                    style={[{
                        height: height,
                        backgroundColor: dimensionColorMap()[contribution.dimension],
                        position: 'absolute',
                        top: 0,
                        left: `${tempPrevContribution}%`,
                        width: `${contributionPercentage}%`,
                    }, ]}
                />)
                })
            }
        </View> 
        );
    }
    
    
    return (
        <View style={{width: windowWidth}}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16}}>
             <Greeting/>
         </View>

        <View style={{marginTop: 24, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16}}>
            <View style={{marginRight: 8}}>
                <View style={{...designSystem.card, alignItems: 'center', justifyContent: 'center', marginBottom: 8, flex:1}}>
                    <Text style={{...designSystem.textStyles.subtitle, color: kauriColors.primary.dark}}>
                        {userData.actionsCompleted}
                    </Text>
                    <Text style={{...designSystem.textStyles.captionsBold, color: hexToRGBA(kauriColors.primary.dark, 0.6), marginBottom: 8}}>
                        {geti18n("common.actionsCompleted").toLowerCase()}
                    </Text>
                    <ProgressBar width={userData.actionsCompleted*100/userData.totalActions}/>
                </View>
                <View style={{...designSystem.card, alignItems: 'center', justifyContent: 'center', flex:1}}>
                    <Text style={{...designSystem.textStyles.subtitle, color: kauriColors.primary.dark}}>
                        {userData.subdimensionsImpacted}
                    </Text>
                    <Text style={{...designSystem.textStyles.captionsBold, color: hexToRGBA(kauriColors.primary.dark, 0.6), marginBottom:8}}>
                        {geti18n("common.causesImpacted").toLowerCase()}
                    </Text>
                    <ProgressBar width={userData.subdimensionsImpacted*100/userData.totalSubdimensions}/>
                </View>
            </View>
            <View style={{...designSystem.card, alignItems: 'center', justifyContent: 'center', flex:1}}>    
                <Text style={{...designSystem.textStyles.titleBig, color: kauriColors.primary.dark}}>{geti18n("common.feelingStuck")}?</Text>
                <Text style={{...designSystem.textStyles.captionsBold, color: hexToRGBA(kauriColors.primary.dark, 0.6), textAlign: 'center', paddingHorizontal:4}}>
                    {geti18n("common.positiveFocusDescription")}
                </Text>
                <Pressable>
                    <LinearGradient start={{x: 0.0, y:0}} end={{x:1.0, y:1.0}} colors={["rgba(147,160,208,0.67)", "rgba(143,157,212,1)"]} style={{...$positiveFocusIcon}}>

                    <PositiveFocusIcon/>
                    <Text style={{...designSystem.textStyles.captionsBold, color: kauriColors.palette.primary.light, marginLeft: 8}}>
                        {geti18n("common.positiveFocusBtn")}
                    </Text>
                    </LinearGradient>
             </Pressable>
            </View> 
        </View>
        <View style={{...designSystem.card, marginTop: 24, marginHorizontal:16}}>
            <Text style={{...designSystem.textStyles.captionsBold, color: kauriColors.primary.dark, marginTop: 8}}>
                {geti18n("common.mostImpactedCauses")}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingHorizontal: 8}}>
                {
                    mostImpacted.map((item, index)=>{
                        return (
                            <Hex key={index} title={item.subdimension} dimension={item.dimension}/>
                            )
                        })
                    }
            </View>
            <Text style={{...designSystem.textStyles.captionsBold, color: kauriColors.primary.dark, marginTop: 16}}>
                {geti18n("common.totalContributions")}
            </Text>
            <View style={{marginTop: 8}}>
                <ContributionBar contributions={userData.contributionsPerDimension} totalContributions={userData.totalContributions}/>
            </View>
            <View style={{marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8}}>
                {
                    userData.contributionsPerDimension.map((contribution, index)=>{
                        return (
                            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 2}} key={index}>
                                <View style={{width: 6, height: 6, borderRadius: 6, backgroundColor: dimensionColorMap()[contribution.dimension]}}/>
                                <Text style={{marginHorizontal: 8, ...designSystem.textStyles.smallTextsSemi, color: hexToRGBA((kauriColors.primary.dark), 0.7)}}>
                                    {contribution.dimension}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
        <View style={{marginTop: 24, paddingHorizontal: 16, alignItems: 'center'}}>
            <StylisedTitle text={geti18n("home.whatNext")} alt={true} small/>
            <Text style={{textAlign: 'left', color: hexToRGBA(kauriColors.primary.dark, 0.7), ...designSystem.textStyles.paragraph, marginTop: 8}}>
                    {geti18n("home.whatNextDescription")}
            </Text>
        </View>
        <WhatNext/>
         <View style={{height:riveHeight, width:windowWidth}}>
         </View>
        </View>
    )
})


const $positiveFocusIcon:ViewStyle = {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
        alignItems: 'center',
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: 'space-evenly'
}

const $nextBtn:ViewStyle = {
    flex:1,
    margin: 16,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12
}