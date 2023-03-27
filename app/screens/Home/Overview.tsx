import { observer } from "mobx-react-lite";
import React, { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, Platform, Pressable, Text, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native";
import Animated, { Easing, Extrapolate, interpolate, SharedTransition, SharedValue, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { designSystem, kauriColors } from "../../theme";
import { translate as geti18n } from "../../i18n"
import { hexToRGBA } from "../../utils/hexToRGBA";
import { MindfulIcons } from "../../svgs";
import LinearGradient from 'react-native-linear-gradient';
import { dimensionColorMap, dimensionNameMap } from "../../utils/hexDetails";
import { BusyIndicator, LineSeparator, ReadCard, StylisedTitle, Thumbnail, TryBtn } from "../../components";
import { Hex } from "../../components/Hex";
import { shadowGenerator } from "../../utils/shadowGenerator";
import { CompositeNavigationProp, useIsFocused } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { TabStackParamList } from "../Tabs/Tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../navigators";
import { FlashList } from "@shopify/flash-list";
import { hexIntro } from "../../mockdata";
import { SharedElement } from "react-navigation-shared-element";
import { Path, Svg } from "react-native-svg";

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

    const [currentItem, setCurrentItem] = useState<any>(roadMap.resources[0])
    const [currentIndex, setCurrentIndex] = useState(0)
    const isFocused = useIsFocused()

    const translationX = useSharedValue(0);
    const scrollHandler = ({nativeEvent}) => {
        translationX.value = nativeEvent.contentOffset.x
    }
    const onScrollEnd = () => {
        const selectedIndex = Math.round(translationX.value/(winWidth - THUMBNAIL_WIDTH - 32))
        if(currentIndex !== selectedIndex) {
            setCurrentItem(roadMap.resources[selectedIndex])
            setCurrentIndex(selectedIndex)
        }
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
                    // pagingEnabled
                    onScroll={scrollHandler}
                    onMomentumScrollEnd={onScrollEnd}
                    scrollEventThrottle={16}
                    ListHeaderComponent={()=><View style={{width:THUMBNAIL_WIDTH/2 + 16, height: THUMBNAIL_WIDTH}}/>}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_ , index) => `${index}`}
                    renderItem={renderItem}
                />
            </View>

            {currentItem && <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: "80%", marginBottom: 16, paddingHorizontal:16}}>
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
                                        +{`${currentItem.totalCauses - currentItem.topCauses.length}`}
                                    </Text>
                                </View>
                            </View>
                        }
                    </View>
                    <View style={{flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 16, alignItems: 'center', width: '90%'}}>
                        <Text 
                            style={{textAlign: 'left', color: $contentColor, ...designSystem.textStyles.captions, width: '80%'}} numberOfLines={3}>
                            {currentItem.description}
                        </Text>
                        <TryBtn onPress={() => onPress(currentItem.id)}/>
                    </View>
                </View>
            }
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
            const style = Platform.OS === 'ios'? 
                {
                    transform: [{translateY: withTiming(interpolate(translationX.value, inputRange, [24,0,24], Extrapolate.CLAMP), {duration: 100, easing: Easing.inOut(Easing.ease)})}, 
                                {scale: isPressing.value?withTiming(0.98):withTiming(interpolate(translationX.value, inputRange, [0.92, 1, 0.92], Extrapolate.CLAMP), {duration: 100, easing: Easing.inOut(Easing.ease)})}],
                    opacity: withTiming(interpolate(translationX.value, inputRange, [1/4, 1, 1/4], Extrapolate.CLAMP), {duration: 100, easing: Easing.inOut(Easing.ease)}),
                }:{
                    transform: [{scale: isPressing.value?withTiming(0.98):withTiming(1)}]
                }
            return style
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
                            locations={[0, 0.2, 1]}
                            colors={['#755635', kauriColors.primary.yellow,  '#A28362']}
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

    const goToReadDetails = (readId: string) => {
        navigationProps.navigate('readDetail' , {
            readId: readId
        })
    }
   
    const TrailIcon = ({color}) => {
        return (
            <View style={{aspectRatio: 1}}>
                <Svg width="100%" height="100%" viewBox="0 0 28 28" fill="none">
                    <Path fillRule="evenodd" clipRule="evenodd" d="M13.8273 9.97862C13.7959 9.97862 13.7649 9.98593 13.7369 9.99997L13.6922 10.0223C13.5715 10.0826 13.4385 10.1141 13.3035 10.1143C13.2049 10.1589 13.0978 10.1821 12.9894 10.1821H12.8617C12.7467 10.1821 12.633 10.2071 12.5286 10.2553L11.8711 10.5587L11.8228 10.5748C11.7289 10.6061 11.638 10.6457 11.5511 10.6931L11.2096 10.8793C11.1325 10.9214 11.0702 10.986 11.0309 11.0646C10.9501 11.2263 10.8366 11.3695 10.6977 11.4852L10.6503 11.5248C10.5605 11.5996 10.4901 11.695 10.4452 11.8029L10.2242 12.3332L10.0565 12.8783C10.0049 13.0461 9.97862 13.2207 9.97862 13.3962V13.7438C9.97862 13.8877 9.99628 14.0312 10.0312 14.1709L10.2683 15.1194C10.2727 15.1369 10.2818 15.1529 10.2945 15.1656C10.3307 15.2018 10.364 15.2408 10.3941 15.2822L10.8211 15.8693C10.8392 15.8942 10.863 15.9143 10.8905 15.9281C11.0394 16.0025 11.1689 16.1106 11.2687 16.2438L11.3783 16.3898C11.4704 16.5126 11.5919 16.6102 11.7316 16.6738L12.0223 16.8059C12.224 16.7555 12.437 16.8029 12.597 16.9311L12.7084 16.9534C12.8158 16.9749 12.9199 17.0106 13.0178 17.0596L13.0372 17.0693C13.0931 17.0972 13.1537 17.1148 13.2159 17.121L13.4107 17.1405C13.5707 17.1565 13.7322 17.1479 13.8895 17.1151L14.9237 16.8997C15.0706 16.8691 15.2118 16.8156 15.3421 16.7411C15.4526 16.678 15.5541 16.6004 15.6441 16.5104L15.6678 16.4867C15.7294 16.4252 15.7952 16.3681 15.8649 16.3158C15.9518 16.2506 16.0271 16.171 16.0874 16.0806L16.1264 16.0221C16.2085 15.8989 16.3027 15.784 16.4074 15.6793L16.4402 15.6466C16.7096 15.3771 16.8843 15.0276 16.9382 14.6504L16.9733 14.4048L17.054 14.0821C17.1214 13.8122 17.124 13.5302 17.0615 13.2591L17.0058 13.0177C16.9791 12.9023 16.9657 12.7843 16.9657 12.6658C16.9657 12.5809 16.9499 12.4968 16.9191 12.4177L16.7268 11.923C16.6187 11.6452 16.4419 11.3993 16.2129 11.2085L15.8201 10.8812L15.6125 10.6736C15.4419 10.503 15.232 10.3773 15.0013 10.3074L14.7261 10.2615C14.6332 10.246 14.5416 10.2233 14.4522 10.1935L14.2129 10.1137C14.1245 10.0843 14.0428 10.0384 13.9718 9.97862H13.8273ZM14.522 9.28863C14.3871 9.16633 14.2111 9.09815 14.0282 9.09815H13.8273C13.6592 9.09815 13.4934 9.13728 13.3431 9.21245L13.3004 9.2338H13.2767C13.1682 9.2338 13.0611 9.25696 12.9625 9.30162H12.8617C12.6193 9.30162 12.3798 9.35423 12.1596 9.45583L11.5464 9.73886L11.5443 9.73955C11.401 9.78734 11.2621 9.84776 11.1295 9.92012L10.788 10.1064C10.5531 10.2345 10.3631 10.4315 10.2434 10.6708C10.2169 10.7239 10.1796 10.7709 10.1341 10.8088L10.0866 10.8484C9.88781 11.014 9.73199 11.2254 9.63244 11.4643L9.39515 12.0338L9.21495 12.6194C9.13752 12.8711 9.09815 13.1329 9.09815 13.3962V13.7438C9.09815 13.9597 9.12463 14.1749 9.17701 14.3844L9.41415 15.333C9.45723 15.5053 9.54632 15.6626 9.67191 15.7882C9.67559 15.7919 9.67897 15.7958 9.68202 15.8L10.1091 16.3872C10.2101 16.5261 10.343 16.6388 10.4967 16.7156C10.5233 16.7289 10.5465 16.7482 10.5644 16.7721L10.6739 16.9181C10.8546 17.159 11.093 17.3507 11.3673 17.4753L11.7008 17.6269C11.835 17.6879 11.9838 17.7076 12.1284 17.6842C12.2001 17.7321 12.2808 17.7658 12.3662 17.7829L12.5358 17.8168C12.5664 17.8229 12.5961 17.8331 12.6241 17.8471L12.6435 17.8568C12.7952 17.9327 12.9595 17.9802 13.1283 17.9971L13.3231 18.0166C13.5723 18.0415 13.8239 18.0282 14.0691 17.9771L15.1033 17.7616C15.3405 17.7122 15.5685 17.6258 15.7789 17.5056C15.9573 17.4036 16.1214 17.2783 16.2667 17.133L16.2904 17.1093C16.3225 17.0772 16.3568 17.0474 16.3931 17.0202C16.56 16.8951 16.7043 16.7425 16.82 16.569L16.859 16.5105C16.909 16.4355 16.9663 16.3656 17.03 16.3019L17.0627 16.2692C17.4669 15.865 17.729 15.3407 17.8098 14.7749L17.8385 14.5742L17.9082 14.2957C18.0094 13.8908 18.0132 13.4677 17.9194 13.0611L17.8637 12.8197C17.852 12.7693 17.8462 12.7176 17.8462 12.6658C17.8462 12.4718 17.8101 12.2794 17.7397 12.0986L17.5474 11.6039C17.3853 11.1871 17.1201 10.8183 16.7765 10.5321L16.4144 10.2303L16.2351 10.051C15.9532 9.76912 15.6042 9.56372 15.2209 9.4542C15.2026 9.44898 15.1842 9.44499 15.1659 9.44219L14.8709 9.39302C14.8233 9.38509 14.7764 9.37345 14.7307 9.3582L14.522 9.28863Z" fill={color}/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M13.9656 7.88757C13.8969 7.88757 13.8291 7.90357 13.7676 7.93429L13.6986 7.9688C13.5297 8.05324 13.3435 8.09721 13.1547 8.09721H13.1272C12.9849 8.16616 12.8288 8.20202 12.6706 8.20202H12.4734C12.2768 8.20202 12.0825 8.24469 11.904 8.32707L10.8944 8.79306L10.7369 8.84554C10.6442 8.87646 10.5543 8.91557 10.4685 8.9624L9.85781 9.29549C9.71537 9.37318 9.60013 9.49261 9.52757 9.63774C9.41063 9.8716 9.24657 10.0787 9.04571 10.2461L8.97243 10.3072C8.81755 10.4363 8.69617 10.6009 8.61863 10.787L8.27471 11.6124L7.96057 12.6333C7.91218 12.7906 7.88757 12.9542 7.88757 13.1188V13.9843C7.88757 14.1193 7.90412 14.2537 7.93686 14.3847L8.3392 15.994C8.35167 16.0439 8.37747 16.0895 8.41384 16.1259C8.46497 16.177 8.51201 16.2321 8.55454 16.2905L9.2145 17.198C9.25469 17.2532 9.30757 17.298 9.36868 17.3286C9.58072 17.4346 9.76517 17.5885 9.90741 17.7782L10.0766 18.0039C10.2321 18.2111 10.4371 18.3759 10.673 18.4831L11.1636 18.7061L11.2091 18.6947C11.4911 18.6242 11.7882 18.6958 12.0065 18.8835L12.2109 18.9244C12.3656 18.9554 12.5154 19.0068 12.6564 19.0773L12.6864 19.0923C12.787 19.1426 12.8959 19.1741 13.0077 19.1853L13.4492 19.2294C13.6166 19.2461 13.7856 19.2372 13.9502 19.2029L15.7937 18.8188C15.9631 18.7835 16.1259 18.7219 16.2761 18.636L16.4516 18.5357C16.579 18.4629 16.6961 18.3735 16.7999 18.2697L16.902 18.1676C16.9928 18.0768 17.0899 17.9926 17.1926 17.9156C17.3388 17.8059 17.4653 17.6722 17.5667 17.5201L17.6596 17.3807C17.7601 17.23 17.8752 17.0895 18.0034 16.9614L18.3786 16.5862C18.6312 16.3336 18.795 16.0059 18.8455 15.6523L18.9554 14.8831L19.1485 14.111C19.2117 13.858 19.2141 13.5935 19.1555 13.3394L19.0045 12.6852C18.9656 12.5164 18.9459 12.3438 18.9459 12.1706C18.9459 12.0233 18.9185 11.8773 18.8651 11.74L18.4555 10.6867C18.3542 10.4262 18.1884 10.1957 17.9737 10.0168L17.1332 9.31632L16.6803 8.86344C16.4819 8.66506 16.2362 8.5205 15.9665 8.44343L15.8112 8.39905L15.3761 8.32654C15.2392 8.30372 15.1042 8.27021 14.9726 8.22631L14.6026 8.103C14.4671 8.05781 14.3428 7.98432 14.2381 7.88757H13.9656ZM14.9713 7.06575C14.7843 6.88703 14.5353 6.78698 14.2761 6.78698H13.9656C13.726 6.78698 13.4897 6.84276 13.2754 6.94989L13.2064 6.9844C13.1904 6.99243 13.1727 6.99661 13.1547 6.99661H13.1146C12.9564 6.99661 12.8004 7.03248 12.6581 7.10143H12.4734C12.1175 7.10143 11.7659 7.17866 11.4428 7.32778L10.4885 7.76822L10.3889 7.80143C10.2343 7.85297 10.0845 7.91815 9.94145 7.9962L9.33079 8.32928C8.99108 8.51458 8.71622 8.79943 8.54317 9.14554C8.49414 9.2436 8.42535 9.33045 8.34113 9.40063L8.26785 9.4617C7.97668 9.70434 7.74848 10.0138 7.6027 10.3637L7.23838 11.238L6.90865 12.3096C6.82799 12.5718 6.78698 12.8445 6.78698 13.1188V13.9843C6.78698 14.2093 6.81457 14.4334 6.86913 14.6516L7.27147 16.261C7.33232 16.5044 7.45819 16.7267 7.63561 16.9041C7.64609 16.9146 7.65573 16.9259 7.66445 16.9379L8.32441 17.8453C8.46832 18.0432 8.65765 18.2036 8.87648 18.313C8.9357 18.3426 8.98721 18.3856 9.02693 18.4386L9.19617 18.6642C9.46239 19.0192 9.81363 19.3014 10.2175 19.485L10.733 19.7193C10.9328 19.8102 11.1563 19.8341 11.3703 19.7883C11.477 19.8689 11.6009 19.9248 11.733 19.9512L11.9951 20.0037C12.0538 20.0154 12.1107 20.0349 12.1642 20.0617L12.1942 20.0767C12.4145 20.1868 12.6531 20.2559 12.8982 20.2804L13.3397 20.3245C13.6187 20.3524 13.9002 20.3375 14.1747 20.2804L16.0182 19.8963C16.3005 19.8375 16.5718 19.7347 16.8221 19.5916L16.9976 19.4913C17.21 19.37 17.4052 19.2209 17.5781 19.048L17.6803 18.9458C17.7342 18.8918 17.7919 18.8418 17.8529 18.796C18.099 18.6115 18.3118 18.3865 18.4824 18.1306L18.5753 17.9912C18.6356 17.9008 18.7047 17.8165 18.7816 17.7396L19.1568 17.3644C19.5778 16.9434 19.8509 16.3973 19.9351 15.8079L20.0369 15.0949L20.2162 14.3779C20.3216 13.9562 20.3256 13.5155 20.2279 13.0919L20.0769 12.4377C20.0567 12.3501 20.0465 12.2605 20.0465 12.1706C20.0465 11.8868 19.9937 11.6055 19.8909 11.3411L19.4812 10.2878C19.3124 9.85364 19.0361 9.46948 18.6783 9.17128L17.8761 8.50278L17.4585 8.08521C17.1279 7.75456 16.7184 7.51364 16.2688 7.38518L16.0536 7.32368L15.557 7.24093C15.4768 7.22755 15.3978 7.20792 15.3206 7.1822L14.9713 7.06575Z" fill={color}/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M14.1499 5.13609C14.0371 5.13609 13.9259 5.16235 13.825 5.21277L13.7235 5.26352C13.4857 5.38246 13.2233 5.44438 12.9574 5.44438H12.8994C12.6963 5.54575 12.4725 5.59853 12.2455 5.59853H11.8223C11.61 5.59853 11.4002 5.64461 11.2074 5.73359L9.60556 6.47289L9.2905 6.57791C9.20803 6.6054 9.12817 6.64016 9.05185 6.68179L8.07287 7.21578C7.84986 7.33742 7.66943 7.52441 7.55582 7.75162C7.38852 8.08622 7.1538 8.38258 6.86641 8.62207L6.67434 8.78214C6.49261 8.93358 6.35019 9.1267 6.2592 9.34506L5.70983 10.6636L5.20098 12.3173C5.15796 12.4571 5.13609 12.6026 5.13609 12.7489V14.3049C5.13609 14.4249 5.15081 14.5444 5.17991 14.6608L5.80251 17.1512C5.82417 17.2379 5.86898 17.317 5.93215 17.3802C6.00454 17.4526 6.07115 17.5306 6.13137 17.6133L7.10191 18.9478C7.16813 19.0389 7.25525 19.1127 7.35595 19.163C7.65728 19.3137 7.9194 19.5325 8.12155 19.802L8.50525 20.3136C8.65297 20.5106 8.84786 20.6672 9.07198 20.7691L10.022 21.2009L10.1146 21.1778C10.5117 21.0785 10.9305 21.1826 11.2343 21.4523L11.5547 21.5164C11.7755 21.5605 11.9895 21.6339 12.1909 21.7346L12.235 21.7567C12.3911 21.8348 12.5601 21.8837 12.7338 21.901L13.5415 21.9818C13.6903 21.9967 13.8404 21.9887 13.9868 21.9582L17.0141 21.3275C17.1647 21.2962 17.3094 21.2413 17.4429 21.165L17.9637 20.8674C18.0769 20.8027 18.181 20.7232 18.2733 20.631L18.5708 20.3335C18.669 20.2353 18.774 20.1442 18.8851 20.0608L19.0749 19.9185C19.208 19.8187 19.3232 19.6969 19.4155 19.5585L19.702 19.1287C19.8092 18.9679 19.932 18.8181 20.0687 18.6814L20.9372 17.8129C21.1617 17.5884 21.3073 17.2971 21.3522 16.9828L21.5621 15.5137L21.9054 14.1405C21.9616 13.9156 21.9638 13.6805 21.9116 13.4546L21.6245 12.2106C21.5746 11.9941 21.5494 11.7727 21.5494 11.5506V11.4435C21.5494 11.2616 21.5156 11.0812 21.4496 10.9116L20.7262 9.0514C20.6361 8.81986 20.4888 8.61498 20.2979 8.45594L18.8591 7.25689L18.0057 6.40352C17.8294 6.22718 17.611 6.09869 17.3712 6.03018L16.8806 5.89L16.1671 5.77108C16.0159 5.74588 15.8669 5.70887 15.7215 5.6604L15.1106 5.45678C14.9122 5.39063 14.7311 5.28103 14.5806 5.13609H14.1499ZM15.5886 4.06929C15.3264 3.8126 14.9739 3.66864 14.6065 3.66864H14.1499C13.8093 3.66864 13.4734 3.74793 13.1688 3.90024L13.0673 3.95098C13.0332 3.96804 12.9955 3.97693 12.9574 3.97693H12.8985C12.6716 3.97693 12.4477 4.0297 12.2447 4.13107H11.8223C11.3976 4.13107 10.978 4.22324 10.5924 4.4012L9.06441 5.10644L8.82645 5.18576C8.66151 5.24074 8.50179 5.31026 8.34916 5.39352L7.37017 5.92751C6.88413 6.19262 6.49089 6.60016 6.24329 7.09536C6.16653 7.24888 6.05883 7.38486 5.92697 7.49474L5.73489 7.65481C5.37144 7.95768 5.0866 8.34394 4.90463 8.78066L4.32806 10.1644L3.79842 11.8857C3.71238 12.1654 3.66864 12.4563 3.66864 12.7489V14.3049C3.66864 14.5449 3.69807 14.7839 3.75627 15.0167L4.37887 17.5071C4.46504 17.8518 4.64327 18.1666 4.8945 18.4178C4.9127 18.436 4.92945 18.4556 4.94459 18.4765L5.91512 19.811C6.11963 20.0921 6.3887 20.3201 6.69968 20.4756C6.79725 20.5244 6.88213 20.5952 6.94758 20.6825L7.33129 21.1941C7.62672 21.588 8.0165 21.9012 8.46474 22.105L9.4273 22.5425C9.71701 22.6742 10.0423 22.7053 10.3515 22.6311C10.5053 22.7543 10.6869 22.8393 10.8815 22.8782L11.2669 22.9553C11.3598 22.9739 11.4499 23.0048 11.5346 23.0472L11.5787 23.0692C11.8945 23.2271 12.2364 23.3261 12.5877 23.3612L13.3955 23.442C13.693 23.4717 13.9933 23.4558 14.2861 23.3948L17.3134 22.7641C17.6145 22.7014 17.9039 22.5917 18.171 22.4391L18.6917 22.1416C18.9182 22.0121 19.1265 21.8531 19.3109 21.6686L19.6084 21.3711C19.6575 21.322 19.7101 21.2765 19.7656 21.2348L19.9554 21.0924C20.2216 20.8928 20.4519 20.6494 20.6365 20.3725L20.923 19.9427C20.9766 19.8623 21.038 19.7874 21.1063 19.7191L21.9748 18.8506C22.4239 18.4015 22.7151 17.819 22.8049 17.1903L23.0041 15.7961L23.329 14.4964C23.4415 14.0466 23.4458 13.5765 23.3415 13.1247L23.0544 11.8806C23.0295 11.7724 23.0168 11.6617 23.0168 11.5506V11.4435C23.0168 11.0796 22.9492 10.7189 22.8173 10.3798L22.0939 8.51952C21.9138 8.05646 21.6191 7.64669 21.2374 7.32861L19.8497 6.17218L19.0434 5.36587C18.6907 5.01319 18.2539 4.75621 17.7744 4.61918L17.2038 4.45617L16.4083 4.32359C16.3327 4.31099 16.2582 4.29249 16.1855 4.26825L15.5886 4.06929Z" fill={color}/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M14.3802 1.46745C14.1768 1.46745 13.9761 1.51482 13.7942 1.6058L13.6521 1.67683C13.3598 1.82298 13.0375 1.89906 12.7107 1.89906H12.6283C12.5836 1.89906 12.5394 1.90948 12.4994 1.9295C12.2556 2.0514 11.9867 2.11486 11.7142 2.11486H10.9283C10.7159 2.11486 10.5061 2.16094 10.3133 2.24993L7.90997 3.35917L7.40994 3.52585C7.32747 3.55334 7.24761 3.5881 7.17129 3.62973L5.57555 4.50013C5.31252 4.64361 5.0997 4.86416 4.96571 5.13214L4.83294 5.39768C4.65187 5.75983 4.39781 6.0806 4.08676 6.33981L3.56062 6.77826C3.37889 6.9297 3.23647 7.12283 3.14549 7.34118L2.28782 9.39958L1.53235 11.8549C1.48933 11.9947 1.46745 12.1401 1.46745 12.2864V14.7057C1.46745 14.8257 1.48217 14.9452 1.51127 15.0616L2.4092 18.6533C2.45243 18.8262 2.54185 18.9842 2.66789 19.1102C2.75841 19.2007 2.84169 19.2982 2.91698 19.4017L4.27573 21.27C4.39609 21.4355 4.55446 21.5697 4.73749 21.6612C5.11861 21.8517 5.45013 22.1284 5.70579 22.4693L6.37806 23.3657C6.52577 23.5626 6.72067 23.7192 6.94479 23.8211L8.49732 24.5268C8.54638 24.5491 8.60155 24.5541 8.65384 24.5411L8.80203 24.504C9.28835 24.3824 9.80263 24.5233 10.1591 24.8751L10.7313 24.9895C10.9871 25.0406 11.2349 25.1257 11.4682 25.2423L11.9234 25.4699C11.9875 25.502 12.0538 25.5293 12.1219 25.5516L14.301 26.2671C14.5453 26.3474 14.8063 26.362 15.0581 26.3095L18.9852 25.4914C19.2785 25.4303 19.5461 25.2809 19.752 25.0632L20.7952 23.9603L21.5594 23.1962C21.6547 23.1009 21.7566 23.0125 21.8645 22.9316L22.0332 22.8051C22.2349 22.6538 22.3639 22.4249 22.389 22.1741C22.4434 21.6301 22.6843 21.1217 23.0709 20.7352L24.2975 19.5085C24.522 19.284 24.6677 18.9927 24.7126 18.6784L25.0458 16.3461L25.574 14.233C25.6303 14.0081 25.6324 13.773 25.5803 13.5471L25.1082 11.5015C25.0583 11.2851 25.0331 11.0637 25.0331 10.8415V10.4262C25.0331 10.2442 24.9992 10.0639 24.9333 9.89429L23.7782 6.92421C23.6882 6.69267 23.5409 6.48779 23.35 6.32875L21.1712 4.51312L19.8246 3.16649C19.6483 2.99015 19.4299 2.86165 19.1901 2.79314L18.2679 2.52965L17.1844 2.34907C17.0332 2.32387 16.8842 2.28687 16.7388 2.2384L15.8181 1.93148C15.5718 1.84938 15.348 1.71106 15.1644 1.52747C15.1259 1.48904 15.0738 1.46745 15.0195 1.46745H14.3802ZM16.202 0.489825C15.8884 0.176195 15.463 0 15.0195 0H14.3802C13.949 0 13.5236 0.100405 13.1379 0.293264L12.9958 0.364302C12.9073 0.408562 12.8097 0.431604 12.7107 0.431604H12.6283C12.3557 0.431604 12.0869 0.495067 11.8431 0.616967C11.8031 0.636985 11.7589 0.647407 11.7142 0.647407H10.9283C10.5036 0.647407 10.084 0.739571 9.69839 0.917538L7.36882 1.99272L6.94589 2.1337C6.78095 2.18868 6.62123 2.2582 6.4686 2.34146L4.87285 3.21186C4.34679 3.49881 3.92116 3.93991 3.65318 4.47588L3.52041 4.74141C3.42987 4.92249 3.30285 5.08287 3.14732 5.21248L2.62118 5.65093C2.25772 5.95381 1.97288 6.34006 1.79091 6.77678L0.906052 8.90044L0.129785 11.4233C0.0437451 11.7029 0 11.9939 0 12.2864V14.7057C0 14.9457 0.0294295 15.1847 0.0876292 15.4175L0.985557 19.0092C1.0933 19.4402 1.31613 19.8338 1.63025 20.1479C1.66657 20.1842 1.69999 20.2233 1.7302 20.2648L3.08895 22.1331C3.34759 22.4888 3.6879 22.7771 4.08122 22.9737C4.25858 23.0624 4.41285 23.1911 4.53182 23.3498L5.2041 24.2461C5.49953 24.64 5.88931 24.9533 6.33755 25.157L7.89008 25.8627C8.24106 26.0223 8.63573 26.0582 9.00975 25.9647L9.14087 25.9319C9.33939 26.1256 9.58986 26.2577 9.86207 26.3122L10.4435 26.4284C10.5714 26.454 10.6953 26.4965 10.812 26.5549L11.2672 26.7825C11.3953 26.8465 11.528 26.9011 11.6641 26.9458L13.8432 27.6614C14.3318 27.8218 14.8539 27.851 15.3574 27.7461L19.2845 26.928C19.8711 26.8058 20.4063 26.5069 20.818 26.0716L21.8473 24.9836L22.597 24.2339C22.6432 24.1876 22.6927 24.1448 22.7449 24.1056L22.9137 23.979C23.4439 23.5813 23.7832 22.9796 23.8492 22.3201C23.8699 22.1132 23.9615 21.9198 24.1085 21.7728L25.3352 20.5462C25.7842 20.0971 26.0755 19.5146 26.1653 18.8859L26.4878 16.6285L26.9977 14.5889C27.1101 14.1391 27.1144 13.669 27.0102 13.2171L26.5381 11.1715C26.5131 11.0633 26.5005 10.9526 26.5005 10.8415V10.4262C26.5005 10.0623 26.4328 9.70156 26.3009 9.36242L25.1459 6.39233C24.9658 5.92927 24.6711 5.51949 24.2894 5.20142L22.1618 3.4284L20.8623 2.12884C20.5096 1.77616 20.0728 1.51917 19.5933 1.38215L18.5911 1.09583L17.4257 0.901585C17.3501 0.888985 17.2756 0.870482 17.2029 0.846246L16.2821 0.539328C16.2519 0.529268 16.2245 0.51232 16.202 0.489825Z" fill={color}/>
                    <Path d="M15.4083 13.574C15.4083 14.587 14.587 15.4083 13.574 15.4083C12.5609 15.4083 11.7396 14.587 11.7396 13.574C11.7396 12.5609 12.5609 11.7396 13.574 11.7396C14.587 11.7396 15.4083 12.5609 15.4083 13.574Z" fill={color}/>
                </Svg>
            </View>
        )
    }
    return (
        <View style={{width: windowWidth, minHeight: windowHeight/2}}>
        { mostImpacted.length === 0 ? <BusyIndicator style="light"/>:
            <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16}}>
                    <Greeting/>
                </View>

                <View style={{marginVertical: 24, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16}}>
                    <View style={{marginRight: 8}}>
                        <View style={{...designSystem.card, alignItems: 'center', justifyContent: 'center', marginBottom: 8, flex:1}}>
                            <Text style={{...designSystem.textStyles.subtitle, color: kauriColors.primary.dark}}>
                                {`${userData.actionsCompleted}`}
                            </Text>
                            <Text style={{...designSystem.textStyles.captionsBold, color: $contentColor, marginBottom: 8}}>
                                {geti18n("common.actionsCompleted").toLowerCase()}
                            </Text>
                            <ProgressBar width={userData.actionsCompleted*100/userData.totalActions}/>
                        </View>
                        <View style={{...designSystem.card, alignItems: 'center', justifyContent: 'center', flex:1}}>
                            <Text style={{...designSystem.textStyles.subtitle, color: kauriColors.primary.dark}}>
                                {`${userData.subdimensionsImpacted}`}
                            </Text>
                            <Text style={{...designSystem.textStyles.captionsBold, color: $contentColor, marginBottom:8}}>
                                {geti18n("common.causesImpacted").toLowerCase()}
                            </Text>
                            <ProgressBar width={userData.subdimensionsImpacted*100/userData.totalSubdimensions}/>
                        </View>
                    </View>
                    <View style={{...designSystem.card, alignItems: 'center', justifyContent: 'center', flex:1}}>    
                        <Text style={{...designSystem.textStyles.captionsMediumBold, color: kauriColors.primary.dark, fontSize:16}}>{geti18n("common.feelingStuck")}?</Text>
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
                <View style={{...designSystem.card, marginHorizontal:16}}>
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
                    <View style={{marginTop: 8, marginBottom: 8}}>
                        {
                            userData.contributionsPerDimension.map((contribution, index)=>{
                                return (
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 2}} key={index}>
                                        <View style={{width: 6, height: 6, borderRadius: 6, backgroundColor: dimensionColorMap()[contribution.dimension]}}/>
                                        <Text style={{marginHorizontal: 8, ...designSystem.textStyles.smallTextsSemi, color: hexToRGBA((kauriColors.primary.dark), 0.7)}}>
                                            {dimensionNameMap(contribution.dimension)}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                <LineSeparator/>
                <LinearGradient style={{borderRadius:12, padding:16, borderColor: "rgba(240,115,116, 0.67)", borderWidth: 1, alignItems: 'center', marginHorizontal: 16}}
                            colors={["rgba(240,115,116,0.67)", "rgba(240,115,116,1)"]}
                            start={{x:0, y:0}}
                            end={{x:1, y:1}}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{...designSystem.textStyles.titleBigger, color: "#fff", marginLeft: 4}}>
                                    Trail
                                </Text>
                            </View>
                            <Text style={{...designSystem.textStyles.captionsBold, color: '#fff', textAlign: 'center', marginTop: 8}}>
                                Visualise your sustainable journey in a stunning tree trunk display. Each ring, a celebration of your progress and triumphs, reminds you of how far you've come, and inspires you to keep growing and flourishing.
                            </Text>
                            <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                                navigationProps.navigate('trail')
                            }} style={{backgroundColor: '#fff', borderRadius: 12, paddingHorizontal:16, paddingVertical: 8, alignItems: 'center', marginTop: 24, flexDirection: 'row'}}>
                                <View style={{width: 28}}>
                                    <TrailIcon color="rgba(240,115,116,1)"/>
                                </View>
                                <Text style={{...designSystem.textStyles.captionsBold, color: "rgba(240,115,116,1)", marginLeft: 8}}>
                                    Generate your Trail
                                </Text>
                            </TouchableOpacity>
                </LinearGradient>
                <LineSeparator/>
                <View style={{paddingHorizontal: 16}}>
                    
                        <Text style={{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}}>
                            Actions on your roadmap
                        </Text>
                        <TouchableOpacity activeOpacity={0.9}>
                            <Text style={{ ...designSystem.textStyles.captionsBold, color: kauriColors.primary.yellow}}>
                                            See All
                            </Text>
                        </TouchableOpacity>
                </View>
                <WhatNext onPress={goToActionDetails} roadMap={data.roadmap}/>
                <LineSeparator/>
               <ReadCard title={hexIntro.title} image={hexIntro.url} description={hexIntro.description} onPress={goToReadDetails}/> 
                <View style={{height:riveHeight*1.4, width:windowWidth}}>
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