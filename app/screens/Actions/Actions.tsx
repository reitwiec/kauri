import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useRef, useState } from "react";
import { FlatList, StatusBar, Text, useWindowDimensions, View, ViewStyle } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { RiveHeader } from "../../components";
import { actionsChips } from "../../mockdata";
import type { AppStackParamList } from "../../navigators";
import useIsReady from "../../utils/useIsReady";
import type { TabStackParamList } from "../Tabs/Tabs";
import { Explore } from "./Explore";
import { ForYou } from "./ForYou";

type ActionsProps = CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, 'actions'>,
    NativeStackScreenProps<AppStackParamList>
>
export const Actions:FC<ActionsProps> = observer(function Actions(_props){
    const riveHeight = 240
    const winWidth = useWindowDimensions().width
    const translationY = useSharedValue(0)
    const [actionsState, setActionsState] = useState('forYou');
    const actionsStateValue = useSharedValue('forYou')
    const flatRef = useRef<any>()
 
    const updateActionsState = useCallback((key:string) =>{
        console.log(key)
        flatRef.current.scrollToIndex({
            index:key==='forYou'?0:1,
            animated: true
        })
        setTimeout(()=>{
                setActionsState(key)
            },300)
    },[]);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event)=>{
            translationY.value = event.contentOffset.y
        }
    })
    

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
    const renderSubview = useCallback(({item})=>{
        if(item.name === 'forYou'){
            return(
                    <Animated.View style={$scrollContainer_animated}>
                        <ForYou riveHeight={riveHeight} translationY={translationY}/>
                    </Animated.View>
            )
        }else{
            return(
                <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16} style={[$scrollContainer, $scrollContainer_animated, {width: winWidth}]} showsVerticalScrollIndicator={false}>
                    <Explore riveHeight={riveHeight}/>
                </Animated.ScrollView>
            )
        }
    },[])
    const isReady = useIsReady()
    return (
        <Animated.View style={[$container]} >
            <StatusBar barStyle={'dark-content'} backgroundColor="rgba(255,255,255,1)"/>
            {isReady?<FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                keyExtractor={item=> item.name}
                bounces={false}
                ref={flatRef}
                pagingEnabled
                maxToRenderPerBatch={1}
                data={[{name: 'forYou'}, {name: 'explore'}]}
                scrollEnabled={false}
                renderItem={renderSubview}
            />:<View>
            <Text>Busy</Text>
        </View>}
            <RiveHeader translationY={translationY} data={actionsChips} config={{right: ["customise"],left:["filter", "search"], height: riveHeight}} screenState={updateActionsState}/>
        </Animated.View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1
}

const $scrollContainer:ViewStyle = {
}