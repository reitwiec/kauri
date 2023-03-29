import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Platform, StatusBar, Text, useWindowDimensions, View, ViewStyle } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { RiveHeader } from "../../components";
import { getMostImpacted, homeChips, roadMap, userDataSummary } from "../../mockdata";
import { translate as geti18n } from "../../i18n"
import type { TabStackParamList } from "../Tabs/Tabs";
import { designSystem, kauriColors } from "../../theme";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { Overview } from "./Overview";
import { CompositeScreenProps, useIsFocused} from "@react-navigation/native";
import { Impact } from "./Impact";
import type { AppStackParamList } from "../../navigators";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import useIsReady from "../../utils/useIsReady";
import useScrollToTop from "../../utils/useScrollToTop";

type HomeProps = CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, 'home'>,
    NativeStackScreenProps<AppStackParamList>
>

export const Home:FC<HomeProps> = observer(function Home(_props){
    const translationY = useSharedValue(0)
    const [userData, setUserData] = useState(userDataSummary)
    const [homeState, setHomeState] = useState<'overview'|'impact'>('overview')
    const homeStateVal = useSharedValue('overview')
    const riveHeight = 240
    const {width:winWidth, height:winHeight} = useWindowDimensions()
    const minRiveHeight = 200*winHeight/844
    
    const [pageConfig, setPageConfig] = useState<any[]>([{
        name: 'overview', 
        data: { 
            mostImpacted: [],
            roadmap: {
                count: 0,
                resources: [],
                nextAction: {},
                completed: 0
            }
        }}, 
        {name: 'impact', data: []}])

    const [overviewData, setOverviewData] = useState<any>(
        {
            roadmap: { 
            count: 0,
            resources: [],
            nextAction: {},
            completed:0
            },
            mostImpacted: []
        }
    )

    const [impactData, setImpactData] = useState<any>({ 
        count: 0,
        resources: [],
        nextAction: {},
        completed:0
})

    const flatRef = useRef<any>()
    const overviewRef = useRef<any>()
    const impactRef = useRef<any>()
    const momentumState = useSharedValue('ENDED')
    const updateMomentumState = (momState) => {
        momentumState.value = momState
    }
    const states = {
        'overview': {
            index: 0,
            ref: overviewRef,
            scrollToTop: () => {
                if(momentumState.value === 'ENDED' || Platform.OS === 'ios'){
                    overviewRef.current.scrollTo({x: 0, y: 0, animated: true})
                    translationY.value = withTiming(0)
                }
            }},
        'impact':  {
            index: 1,
            ref: impactRef,
            scrollToTop: () => {
                if(momentumState.value === 'ENDED' || Platform.OS === 'ios'){
                    impactRef.current.scrollTo({x: 0, y: 0, animated: true})
                    translationY.value = withTiming(0)
                }
            }}}
    
    useScrollToTop(overviewRef, states['overview'].scrollToTop)
    useScrollToTop(impactRef, states['impact'].scrollToTop)

    const updateHomeState = useCallback((key:any) =>{
        if(flatRef.current){
            flatRef.current.scrollToIndex({
            index:states[key].index,
            animated: true
            })
        }
        const prevState = homeStateVal.value
        if(states[prevState].ref.current){
            states[prevState].scrollToTop()
        }
        setTimeout(()=>{
                homeStateVal.value = key
                setHomeState(key)
            },300)
    },[]);

    useEffect(()=>{
        switch(homeState){
            case 'overview':
                if(!overviewData.mostImpacted.length){
                    const prevStateConfig = pageConfig
                    prevStateConfig[0].data.roadmap = roadMap
                    prevStateConfig[0].data.mostImpacted = getMostImpacted(3)
                    setPageConfig(prevStateConfig)
                    setOverviewData(prevStateConfig[0].data)
                }
                break
            case 'impact':
                if(!impactData.resources.length){
                    const prevStateConfig = pageConfig
                }
                break
        }
    }, [homeState])

    const isFocused = useIsFocused()

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event)=>{
            if(!isFocused){
                return
            }
            translationY.value = event.contentOffset.y
        }
    })

    const $scrollContainer_animated = useAnimatedStyle(()=>{
        return {
            transform:[
                {translateY: interpolate(
                    translationY.value,
                    [0, 200],
                    [riveHeight, minRiveHeight],
                    Extrapolate.CLAMP
                )}
            ]
        }
    }, [translationY])

    const Greeting = ({}) =>{
        return (
            <View>
                <Text style={{...designSystem.textStyles.titleNormal, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>{geti18n("common.morning")},</Text>
                <Text style={{...designSystem.textStyles.titleBig, color: kauriColors.primary.dark}}>{userData.name}</Text>
            </View>
        )
    }

    const renderSubview = useCallback(({item})=>{
        if(item.name === 'overview'){
            return(
                <Animated.ScrollView 
                    onScrollBeginDrag={()=>{
                        updateMomentumState('START')
                    }}
                    onMomentumScrollEnd={()=>{
                        updateMomentumState('ENDED')
                    }}  
                    ref={overviewRef} 
                    decelerationRate={Platform.OS === 'android'?0.95:'normal'}
                    onScroll={scrollHandler} 
                    scrollEventThrottle={16} 
                    style={[$scrollContainer, $scrollContainer_animated, {width: winWidth}]} 
                    showsVerticalScrollIndicator={false} 
                    nestedScrollEnabled={true}>
                    <Overview riveHeight={riveHeight} Greeting={Greeting} userData={userData} navigationProps={_props.navigation} data={item.data}/>
                </Animated.ScrollView>
            )
        }else{
            return(
                <Animated.ScrollView 
                    onScrollBeginDrag={()=>{
                        updateMomentumState('START')
                    }}
                    onMomentumScrollEnd={()=>{
                        updateMomentumState('ENDED')
                    }}
                    ref={impactRef} 
                    onScroll={scrollHandler} 
                    decelerationRate={Platform.OS === 'android'?0.95:'normal'}
                    scrollEventThrottle={16} 
                    style={[$scrollContainer, $scrollContainer_animated, {width: winWidth}]} 
                    showsVerticalScrollIndicator={false}>
                    <Impact riveHeight={riveHeight} navigationProps={_props.navigation}/>
                </Animated.ScrollView>
            )
        }
    },[])

    const isReady = useIsReady()
    return (
        <View style={[$container]}>
            <StatusBar barStyle={'dark-content'} backgroundColor="rgba(255,255,255,1)"/>
            
            {isReady?<FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                keyExtractor={item=> item.name}
                bounces={false}
                ref={flatRef}
                pagingEnabled
                maxToRenderPerBatch={1}
                data={pageConfig}
                scrollEnabled={false}
                renderItem={renderSubview}
            />:<View>
            <Text>Busy</Text>
        </View>}
            <RiveHeader translationY={translationY} data={homeChips} config={{ right: ["customise"], height: riveHeight }} screenState={updateHomeState} isSearching={false} searchClicked={function (override: any, searchPhrase: string): void {
                throw new Error("Function not implemented.");
            } } updateSearchPhrase={function (phrase: string): void {
                throw new Error("Function not implemented.");
            } }/>
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"rgba(255,255,255,1)",
    flex: 1
}
const $scrollContainer:ViewStyle = {
}