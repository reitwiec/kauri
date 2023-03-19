import { observer } from "mobx-react-lite";
import React, { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native";
import Animated, { Easing, Extrapolate, interpolate, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { designSystem, kauriColors } from "../../theme";
import { translate as geti18n } from "../../i18n"
import { hexToRGBA } from "../../utils/hexToRGBA";
import { MindfulIcons } from "../../svgs";
import LinearGradient from 'react-native-linear-gradient';
import { dimensionColorMap } from "../../utils/hexDetails";
import { BusyIndicator, StylisedTitle, Thumbnail, TryBtn } from "../../components";
import { Hex } from "../../components/Hex";
import { shadowGenerator } from "../../utils/shadowGenerator";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { TabStackParamList } from "../Tabs/Tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../navigators";
import { FlashList } from "@shopify/flash-list";

export interface OverviewProps {
    riveHeight: number,
    Greeting: ({}: {}) => JSX.Element,
    userData: any, //need to add user data type
    navigationProps: CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, "home", undefined>, NativeStackNavigationProp<AppStackParamList, "actionDetails", undefined>>,
    data: {
        mostImpacted: any,
        roadmap: any
    }
}

const WhatNext:FC<{onPress:any, roadMap:any}> = memo(({onPress, roadMap}) => {
    const {width:winWidth} = useWindowDimensions()
    const $contentColor = useMemo(() => hexToRGBA(kauriColors.primary.dark, 0.7), [])
    const THUMBNAIL_WIDTH = 144

    const [currentItem, setCurrentItem] = useState<any>(null)

    useEffect(()=>{
        setCurrentItem(roadMap.resources[0])
    },[])

    const translationX = useSharedValue(0);
    const scrollHandler = ({nativeEvent}) => {
        translationX.value = nativeEvent.contentOffset.x
    }
    const onScrollEnd = () => {
        const selectedIndex = translationX.value/(winWidth - THUMBNAIL_WIDTH - 32)
        setCurrentItem(roadMap.resources[selectedIndex])
    }
    const renderItem = useCallback(({item, index}) =>{
        return(
                <RoadmapThumbs item={item} index={index} key={index} translationX={translationX} THUMBNAIL_WIDTH={THUMBNAIL_WIDTH} onPress={onPress}/>
        )
    },[])
    
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: THUMBNAIL_WIDTH * 1.5}}>
                <FlashList
                    data={roadMap.resources}
                    decelerationRate={0}
                    estimatedItemSize={winWidth - THUMBNAIL_WIDTH - 32}
                    horizontal
                    snapToOffsets={[...Array(roadMap.resources.length)].map((x, i) => (i * (winWidth - THUMBNAIL_WIDTH - 32) ))}
                    bounces={false}
                    contentContainerStyle={{
                        paddingTop:((THUMBNAIL_WIDTH*1.5) - (THUMBNAIL_WIDTH+8))/2
                    }}
                    pagingEnabled
                    onScroll={scrollHandler}
                    onMomentumScrollEnd={onScrollEnd}
                    scrollEventThrottle={16}
                    ListHeaderComponent={()=><View style={{width:THUMBNAIL_WIDTH/2 + 16, height: THUMBNAIL_WIDTH}}/>}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_ , index) => `${index}`}
                    renderItem={renderItem}
                />
            </View>

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
                            <Text style={{...designSystem.textStyles.captionsBold, color: $contentColor}}>
                                +{currentItem.totalCauses - currentItem.topCauses.length}
                            </Text>
                        </View>
                    </View>
                }
            </View>}
            {currentItem && <Text 
                style={{textAlign: 'center',paddingHorizontal: 16, width: "90%", color: $contentColor, ...designSystem.textStyles.captions}} numberOfLines={2}>
                {currentItem.description}
            </Text>}
            <View style={{flexDirection: "row", justifyContent: 'space-evenly', paddingHorizontal: 16}}>
                <TryBtn onPress={() => onPress(currentItem.id)}/>
                <TouchableOpacity activeOpacity={0.9} style={{...$nextBtn, borderColor: kauriColors.primary.light, borderWidth:2}} onPress={()=>{
                    console.log("Redirect to actions page")
                }}>
                    <Text style={{color: hexToRGBA(kauriColors.primary.dark,0.7), ...designSystem.textStyles.captionsBold}}>
                        {geti18n("common.seeAll")} (86)
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
})

interface RoadmapThumbsProps {
    item: any,
    index: number,
    translationX: SharedValue<number>,
    THUMBNAIL_WIDTH: number,
    onPress: any
}

const RoadmapThumbs:FC<RoadmapThumbsProps> = React.memo(function roadmapThumbs({item, index, translationX, THUMBNAIL_WIDTH, onPress}){
    const winWidth = useWindowDimensions().width
    const offsetFactor = (winWidth - THUMBNAIL_WIDTH - 32)
    const inputRange = [(index -1)*offsetFactor, index * offsetFactor, (index+1) * offsetFactor]
    const isPressing = useSharedValue(false)
    const $animStyles = {
        thumbnail: useAnimatedStyle(()=>{
            return {
                useNativeDriver:true,
                transform: [
                    {translateY:  withTiming(interpolate(translationX.value, inputRange, [24,0,24], Extrapolate.CLAMP), {duration: 100, easing: Easing.inOut(Easing.ease)})},
                    {scale: isPressing.value?withTiming(0.98):withTiming(interpolate(translationX.value, inputRange, [0.92, 1, 0.92], Extrapolate.CLAMP), {duration: 100, easing: Easing.inOut(Easing.ease)})}
                ],
                opacity: withTiming(interpolate(translationX.value, inputRange, [1/4, 1, 1/4], Extrapolate.CLAMP), {duration: 100, easing: Easing.inOut(Easing.ease)}),
            }
        }, [translationX, isPressing]),
        border: useAnimatedStyle(()=>{
            return {    
                opacity: withTiming(interpolate(translationX.value, inputRange, [0, 1, 0], Extrapolate.CLAMP), {duration: 200, easing: Easing.inOut(Easing.ease)}), 
            }
        }, [translationX])
    }
    

    return (
        <TouchableOpacity activeOpacity={0.9}
        onPressIn={()=>{
            isPressing.value = true
        }}
        onPressOut={()=>{
            isPressing.value = false
        }}
        onPress={()=>{
            onPress(item.id)
        }}
        >
            <Animated.View style={[$animStyles.thumbnail, { alignItems: 'center', justifyContent:'center', height:THUMBNAIL_WIDTH+8, width: winWidth - THUMBNAIL_WIDTH - 32}]}>
                    <Thumbnail src={item.url} width={THUMBNAIL_WIDTH} height={THUMBNAIL_WIDTH} title={item.title} type={"large"} actionType={item.type} pretty={false} status={item.status}/>
                    <Animated.View style={[$animStyles.border, {zIndex: -1, position: 'absolute', top:0}]}>
                        <LinearGradient
                            style={{
                            width: THUMBNAIL_WIDTH + 8,
                            height: THUMBNAIL_WIDTH + 8,
                            borderRadius:16
                            }}
                            start={{x: 1, y: 1}}
                            end={{x: 0.5, y: 0}}
                            colors={['rgba(92,58,36,0.8)', kauriColors.primary.yellow,  'rgba(92,58,36, 0.25)']}
                        />
                    </Animated.View>
            </Animated.View> 
        </TouchableOpacity>
    )
})

const ProgressBar = memo(({width}:{width:number}) =>{
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
})

const ContributionBar = memo(({contributions, totalContributions}:{contributions: any[], totalContributions: number}) => {
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
})

export const Overview:FC<OverviewProps> = observer(function overview({riveHeight, Greeting, userData, navigationProps, data}){
    const {width:windowWidth, height: windowHeight} = useWindowDimensions()
    const mostImpacted = data.mostImpacted
    const $contentColor = useMemo(() => hexToRGBA(kauriColors.primary.dark, 0.7), [])
    const goToActionDetails = (actionId: string) => {
        navigationProps.navigate('actionDetails', {
            actionId,
            cameFrom: 'home'
        })
    }
    

    return (
        <View style={{width: windowWidth, minHeight: windowHeight/2}}>
        { mostImpacted.length === 0 ? <BusyIndicator style="light"/>:
            <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16}}>
                    <Greeting/>
                </View>

                <View style={{marginTop: 24, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16}}>
                    <View style={{marginRight: 8}}>
                        <View style={{...designSystem.card, alignItems: 'center', justifyContent: 'center', marginBottom: 8, flex:1}}>
                            <Text style={{...designSystem.textStyles.subtitle, color: kauriColors.primary.dark}}>
                                {userData.actionsCompleted}
                            </Text>
                            <Text style={{...designSystem.textStyles.captionsBold, color: $contentColor, marginBottom: 8}}>
                                {geti18n("common.actionsCompleted").toLowerCase()}
                            </Text>
                            <ProgressBar width={userData.actionsCompleted*100/userData.totalActions}/>
                        </View>
                        <View style={{...designSystem.card, alignItems: 'center', justifyContent: 'center', flex:1}}>
                            <Text style={{...designSystem.textStyles.subtitle, color: kauriColors.primary.dark}}>
                                {userData.subdimensionsImpacted}
                            </Text>
                            <Text style={{...designSystem.textStyles.captionsBold, color: $contentColor, marginBottom:8}}>
                                {geti18n("common.causesImpacted").toLowerCase()}
                            </Text>
                            <ProgressBar width={userData.subdimensionsImpacted*100/userData.totalSubdimensions}/>
                        </View>
                    </View>
                    <View style={{...designSystem.card, alignItems: 'center', justifyContent: 'center', flex:1}}>    
                        <Text style={{...designSystem.textStyles.titleBig, color: kauriColors.primary.dark}}>{geti18n("common.feelingStuck")}?</Text>
                        <Text style={{...designSystem.textStyles.captionsBold, color: $contentColor, textAlign: 'center', paddingHorizontal:4}}>
                            {geti18n("common.positiveFocusDescription")}
                        </Text>
                        <Pressable>
                            <LinearGradient start={{x: 0.0, y:0}} end={{x:1.0, y:1.0}} colors={["rgba(147,160,208,0.67)", "rgba(143,157,212,1)"]} style={{...$positiveFocusIcon}}>

                            <MindfulIcons type='positiveFocus' color={kauriColors.primary.light}/>
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
                    <Text style={{textAlign: 'left', color: $contentColor, ...designSystem.textStyles.paragraph, marginTop: 8}}>
                            {geti18n("home.whatNextDescription")}
                    </Text>
                </View>
                <WhatNext onPress={goToActionDetails} roadMap={data.roadmap}/>
                <View style={{marginTop: 24, overflow:'hidden',borderColor:kauriColors.primary.light, borderWidth: 2 , backgroundColor: kauriColors.primary.light, width: windowWidth-48, height: 4*(windowWidth-48)/3, marginHorizontal: 24, borderRadius:16, ...shadowGenerator(10)}}>
                    <View style={{backgroundColor: hexToRGBA("#25170E", 0.9), zIndex: 2, padding:16, position:'absolute', top:0, width:'100%'}}>
                        <Text style={{...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.chipBar}}>
                            READ
                        </Text>
                        <Text style={{...designSystem.textStyles.titleBigger, color: kauriColors.primary.light, width: '70%'}}>
                            What do they mean?
                        </Text>
                        {/* <Text style={{...designSystem.textStyles.captions, color: kauriColors.primary.chipBar}}>
                            This is a sample description of the content in this article. Sounds interesting doesn't it?
                        </Text> */}
                    </View>
                    <View style={{transform:[{rotate: '-45deg'}], alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            {
                                ["", "", "", "", "", "",].map((item, index)=>{
                                    return <View style={{paddingHorizontal: 12}} key={index}><Hex title={""} dimension={"dimension1"} size={64}/></View>
                                }
                                )
                            }
                        </View>
                        <View style={{flexDirection: 'row', paddingLeft: 64}}>
                            {
                                ["", "", "", "", "", "",].map((item, index)=>{
                                    return <View style={{paddingHorizontal: 12}} key={index}><Hex title={""} dimension={"dimension4"} size={64}/></View>
                                }
                                )
                            }
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            {
                                ["", "", "", "", "", "",].map((item, index)=>{
                                    return <View style={{paddingHorizontal: 12}} key={index}><Hex title={""} dimension={"dimension3"} size={64}/></View>
                                }
                                )
                            }
                        </View>
                        <View style={{flexDirection: 'row', paddingLeft: 64}}>
                            {
                                ["", "", "", "", "", "",].map((item, index)=>{
                                    return <View style={{paddingHorizontal: 12}} key={index}><Hex title={""} dimension={"dimension2"} size={64}/></View>
                                }
                                )
                            }
                        </View>
                    </View>
                </View>
                <View style={{height:riveHeight*1.5, width:windowWidth}}>
                </View>
            </>}
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