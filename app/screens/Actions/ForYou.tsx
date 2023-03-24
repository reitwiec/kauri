import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { FlatList, Pressable, Text, useWindowDimensions, View, StyleSheet } from "react-native";
import { designSystem, kauriColors } from "../../theme";
import { translate as geti18n } from "../../i18n"
import { roadMap as mockRoadmap } from "../../mockdata";
import React from "react";
import { Easing, SharedValue, useDerivedValue, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { FeatureThumbnail } from "./FeatureThumbnail";
import { RetryIcon } from "../../svgs";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { BusyIndicator, PlaylistListItem, StylisedTitle } from "../../components";
import { Completion } from "./Completion";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import { CompositeNavigationProp, useIsFocused } from "@react-navigation/native";
import { withPause } from "react-native-redash";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { TabStackParamList } from "../Tabs/Tabs";
import type { AppStackParamList } from "../../navigators";
import { FlashList } from "@shopify/flash-list";

export interface ForYouProps{
    riveHeight: number,
    translationY: SharedValue<number>,
    actionsStateValue: SharedValue<string>,
    scrollRef: React.MutableRefObject<any>,
    data: {count: number,
        resources: any[],
        nextAction: any,
        completed:number},
    navigationProps: CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, "actions", undefined>, NativeStackNavigationProp<AppStackParamList, "actionDetails", undefined>>
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
            <View style={{width: '100%', paddingHorizontal: 16, marginTop: 24, alignItems: 'center'}}>
                    <View style={{marginTop: 24}}>
                        <StylisedTitle text={"Your full roadmap"} alt={true} small={true}/>
                    </View>
            </View>
            <View style={{width: '100%'}}>
                    <View style={{marginHorizontal:8}}>
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
            </View>
        </View>
    )
}

export const ForYou:FC<ForYouProps> = observer(function analytics({translationY, actionsStateValue, scrollRef, navigationProps, data}){
    const {width:windowWidth, height:windowHeight} = useWindowDimensions()
    let resources = data.resources

    const isFocused = useIsFocused()
    const scrollHandler = ({nativeEvent}) => {
        if(!isFocused){
            return
        }
        translationY.value = nativeEvent.contentOffset.y
    }

    const progress = useSharedValue(0)
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
            actionId,
            cameFrom: 'actions'
        })
    }

    const _renderItem = ({item, index}:{item:any, index: number}) =>{
        return (
            <PlaylistListItem id={item.id} url={item.url} title={item.title} index={index+1} status={item.status} type={item.type} onPress={goToActionDetails}/>
        )
    }

    return (
            data.resources.length===0? 
            <View style={{width: windowWidth, minHeight: windowHeight/2}}>
                <BusyIndicator style="light"/>
            </View>:
                <View style={{ width: windowWidth, height:windowHeight}}>
                    <FlashList
                        contentOffset={{x:0, y: translationY.value}}
                        data={resources}
                        renderItem={_renderItem}
                        keyExtractor={(item, index) => index+""}
                        scrollEventThrottle={16}
                        ItemSeparatorComponent={() => <View style={{height: 1.25, backgroundColor: kauriColors.primary.light, width: '80%', marginLeft: '10%', marginRight: '10%'}}/>}
                        showsVerticalScrollIndicator={false}
                        ref={scrollRef}
                        ListHeaderComponent={<Header progress={progress} onPress={goToActionDetails} roadMap={data}/>}
                        estimatedItemSize={80}
                        onScroll={scrollHandler}
                        ListFooterComponent={<View style={{height:200, width:'100%'}}/>}
                    />
                </View>
    )
})