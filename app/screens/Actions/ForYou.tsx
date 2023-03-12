import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable, Text, useWindowDimensions, View } from "react-native";
import { designSystem, kauriColors } from "../../theme";
import { translate as geti18n } from "../../i18n"
import { roadMap as mockRoadmap } from "../../mockdata";
import React from "react";
import { Easing, SharedValue, useAnimatedScrollHandler, useDerivedValue, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { FeatureThumbnail } from "./FeatureThumbnail";
import { RetryIcon } from "../../svgs";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { PlaylistListItem, StylisedTitle } from "../../components";
import { Completion } from "./Completion";
import Animated from "react-native-reanimated";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import { CompositeNavigationProp, useIsFocused } from "@react-navigation/native";
import { withPause } from "react-native-redash";
import type { ActionsStackParamList } from "./ActionsNavigator";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { TabStackParamList } from "../Tabs/Tabs";

export interface ForYouProps{
    riveHeight: number,
    translationY: SharedValue<number>,
    actionsStateValue: SharedValue<string>,
    scrollRef: React.MutableRefObject<any>,
    navigationProps: CompositeNavigationProp<NativeStackNavigationProp<ActionsStackParamList, "actionsLanding", undefined>, BottomTabNavigationProp<TabStackParamList, keyof TabStackParamList, undefined>>
}

interface HeaderProps {
    onPress: (actionId: string) => void,
    progress: SharedValue<number>,
    roadMap: any

}
const Header:FC<HeaderProps> = ({onPress, progress, roadMap})=>{
    return(
        <View style={{ width: '100%', alignItems: 'center'}}>
            <View style={{ width: '100%', alignItems: 'center', paddingBottom: 24, paddingTop: 16}}>
                <FeatureThumbnail data={roadMap.nextAction} progress={progress} onPress={onPress}/>
            </View>
            <View style={{width: '100%', paddingHorizontal: 8, paddingVertical:16}}>
                    <View>
                        <StylisedTitle text={"Your full roadmap"} alt={true} small={false}/>
                    </View>
                    <Completion total={roadMap.count} completed={roadMap.completed}/>
                    <Pressable style={{marginTop: 8, flexDirection: 'row', paddingHorizontal: 16}}>
                        <View style={{opacity: 0.6}}>
                            <RetryIcon/>
                        </View>
                        <Text style={{...designSystem.textStyles.smallTextsSemi, color: hexToRGBA(kauriColors.primary.dark, 0.6)}}>
                            {geti18n("actions.recreate")}
                        </Text>
                    </Pressable>
            </View>
        </View>
    )
}

export const ForYou:FC<ForYouProps> = observer(function analytics({translationY, actionsStateValue, scrollRef, navigationProps}){
    const {width:windowWidth, height:windowHeight} = useWindowDimensions()
    const [roadMap, setRoadMap] = useState(mockRoadmap)
    let data = [{title: "dummy"}].concat(roadMap.resources)
    data = data.concat([{title: 'empty'}])

    const scrollHandler = ({nativeEvent}) => {
        translationY.value = nativeEvent.contentOffset.y
    }
    const $containerInsets = useSafeAreaInsetsStyle(['bottom', 'top']);
    const progress = useSharedValue(0)
    const isFocused = useIsFocused()
    const isPaused = useSharedValue(isFocused)

    useEffect(()=>{
        if(actionsStateValue.value !== 'forYou'){
            return
        }
        isPaused.value = !isFocused
    }, [isFocused])

    useDerivedValue(()=>{
        if(actionsStateValue.value !== 'forYou'){
            isPaused.value = true
        }else{
            isPaused.value = false
        }
    }, [actionsStateValue])

    useEffect(()=>{
        progress.value = withPause(withRepeat(withTiming(1, {
            duration:1000,
            easing: Easing.inOut(Easing.ease)
        }), -1, true), isPaused)
    },[])


    const goToActionDetails = (actionId: string) => {
        navigationProps.navigate('actionDetails', {
            actionId
        })
    }


    const _renderItem = ({item, index}) =>{
        if(item.title === 'empty'){
            return (
                <View style={{width: '100%', height: 50}}/>
            )
        }
        if(index === 0 ){
            return(<Header progress={progress} onPress={goToActionDetails} roadMap={roadMap}/>)
        }
        return (
            <PlaylistListItem url={item.url} title={item.title} index={index} status={item.status} type={item.type} onPress={goToActionDetails}/>
        )
    }
    return (
            <View style={{ width: windowWidth}}>
                <FlatList
                            data={data}
                            maxToRenderPerBatch={10}
                            bounces={false}
                            renderItem={_renderItem}
                            style={{ height:windowHeight-80-(56 + Number($containerInsets.paddingBottom))}}
                            keyExtractor={(item, index) => index + "forYou"}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            ref={scrollRef}
                            onScroll={scrollHandler}
                />
            </View>
    )
})