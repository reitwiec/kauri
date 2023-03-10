import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StatusBar, Text, View, ViewStyle } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
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
    const translationY = useSharedValue(0)
    const [actionsState, setActionsState] = useState('forYou');
    const actionsStateValue = useSharedValue('forYou')
    
    const flatRef = useRef<any>()
    const exploreRef = useRef<any>()
    const forYouRef = useRef<any>()
    const states = {'forYou': {index: 0, ref: forYouRef}, 'explore': {index: 1, ref: exploreRef}, 'habits': {index: 2, ref: forYouRef}}
    const updateActionsState = useCallback((key:string) =>{
        if(flatRef.current){
            flatRef.current.scrollToIndex({
                index:states[key].index,
                animated: true
            })
        }
        setTimeout(()=>{
                const prevState = actionsStateValue.value
                actionsStateValue.value = key
                setActionsState(key)
                if(states[prevState].ref){
                    states[prevState].ref.current.scrollToOffset({offset:0, animated:true})
                }
            },300)
    },[]);
    
    const isFocused = useIsFocused()
    
    useEffect(() => {
      return () => {
        if(states[actionsState].ref){
            states[actionsState].ref.current.scrollToOffset({offset:0, animated:true})
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
    const renderSubview = useCallback(({item})=>{
        if(item.name === 'forYou'){
            return(
                    <Animated.View style={$scrollContainer_animated}>
                        <ForYou riveHeight={riveHeight} translationY={translationY} actionsStateValue={actionsStateValue} scrollRef={forYouRef}/>
                    </Animated.View>
            )
        }else{
            return(
                    <Animated.View style={$scrollContainer_animated}>
                        <Explore riveHeight={riveHeight} translationY={translationY} actionsStateValue={actionsStateValue} scrollRef={exploreRef}/>
                    </Animated.View>
            )
        }
    },[])
    const isReady = useIsReady()
    const onViewableItemsChanged = useRef(() => {
        // console.log("Visible items are", viewableItems);
        // console.log("Changed in this iteration", changed);
    })
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
                initialNumToRender={1}
                data={[{name: 'forYou'}, {name: 'explore'}]}
                scrollEnabled={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50
                }}
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

