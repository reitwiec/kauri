import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StatusBar, Text, useWindowDimensions, View, ViewStyle } from "react-native";
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { RiveHeader } from "../../components";
import { homeChips, userDataSummary } from "../../mockdata";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useIsReady from "../../utils/useIsReady";

type HomeProps = CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, 'home'>,
    NativeStackScreenProps<AppStackParamList>
>

export const Home:FC<HomeProps> = observer(function Home(_props){
    const translationY = useSharedValue(0)
    const [userData, setUserData] = useState(userDataSummary)
    const [homeState, setHomeState] = useState('overview')
    const homeStateVal = useSharedValue('overview')
    const riveHeight = 240
    const winWidth = useWindowDimensions().width
    
    const flatRef = useRef<any>()
    const overviewRef = useRef<any>()
    const impactRef = useRef<any>()
    const states = {'overview': {index: 0, ref: overviewRef, scrollToTop: () => overviewRef.current.scrollTo({x: 0, y: 0, animated: true})}, 'impact':  {index: 1, ref: impactRef, scrollToTop: () => impactRef.current.scrollTo({x: 0, y: 0, animated: true})}}
    const updateHomeState = useCallback((key:string) =>{
        flatRef.current.scrollToIndex({
            index:states[key].index,
            animated: true
        })
        setTimeout(()=>{
                const prevState = homeState
                setHomeState(key)
                states[prevState].scrollToTop()
            },300)
    },[]);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event)=>{
            translationY.value = event.contentOffset.y
        }
    })

    const isFocused = useIsFocused()
    
    useEffect(() => {
      return () => {
        if(states[homeState].ref.current){
            states[homeState].scrollToTop()
        }
      }
    }, [isFocused])
    

    const $scrollContainer_animated = useAnimatedStyle(()=>{
        return {
            transform:[
                {translateY: interpolate(
                    translationY.value,
                    [0, 200],
                    [riveHeight, 100],
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
                <Animated.ScrollView bounces={false} ref={overviewRef} onScroll={scrollHandler} scrollEventThrottle={16} style={[$scrollContainer, $scrollContainer_animated, {width: winWidth}]} showsVerticalScrollIndicator={false}>
                    <Overview riveHeight={riveHeight} Greeting={Greeting} userData={userData} navigationProps={_props.navigation}/>
                </Animated.ScrollView>
            )
        }else{
            return(
                <Animated.ScrollView bounces={false} ref={impactRef} onScroll={scrollHandler} scrollEventThrottle={16} style={[$scrollContainer, $scrollContainer_animated, {width: winWidth}]} showsVerticalScrollIndicator={false}>
                    <Impact riveHeight={riveHeight}/>
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
                data={[{name: 'overview'}, {name: 'analytics'}]}
                scrollEnabled={false}
                renderItem={renderSubview}
            />:<View>
            <Text>Busy</Text>
        </View>}
            <RiveHeader translationY={translationY} data={homeChips} config={{ right: ["customise"], height: riveHeight }} screenState={updateHomeState} isSearching={false} searchClicked={function (override: any, searchPhrase: string): void {
                throw new Error("Function not implemented.");
            } } updateSearchPhrase={function (phrase: string): void {
                throw new Error("Function not implemented.");
            } } searchPhrase={""}/>
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"rgba(255,255,255,1)",
    flex: 1
}
const $scrollContainer:ViewStyle = {
}