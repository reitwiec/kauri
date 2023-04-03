import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, useIsFocused } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlashList } from "@shopify/flash-list";
import { observer } from "mobx-react-lite";
import { FC, memo, useEffect } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { LineSeparator, StylisedTitle, Thumbnail } from "../../components";
import { BusyIndicator } from "../../components/BusyIndicator";
import { newActions, singletonResource } from "../../mockdata";
import type { AppStackParamList } from "../../navigators";
import { designSystem, kauriColors } from "../../theme";
import { hexToRGBA } from "../../utils/hexToRGBA";
import type { TabStackParamList } from "../Tabs/Tabs";

export interface ExploreProps{
    riveHeight: number,
    translationY: SharedValue<number>,
    actionsStateValue: SharedValue<string>,
    scrollRef: React.MutableRefObject<any>,
    updateMomentumState: (momState) => void,
    navigationProps: CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, "actions", undefined>, NativeStackNavigationProp<AppStackParamList, 'collectionDetails', undefined>>,
    data: any[]
}
const CollectionItem = memo(({resource, index, windowWidth, goToCollectionDetails}:{resource:any, windowWidth: number, index: number, goToCollectionDetails:(collectionId: string) => void}) => {
    const THUMBNAIL_WIDTH = (((windowWidth - 56 - 24 - 32)/2) - 8)/2

    const isPressing = useSharedValue(false)
    const $scale = useAnimatedStyle(()=>{
        return {
            transform: [{scale: isPressing.value?withTiming(0.98):withTiming(1)}]
        }
    }, [isPressing])

    return (
        <Animated.View style={[{flexBasis:"50%"}, $scale]}>
            <TouchableOpacity 
                activeOpacity={0.9}
                onPressIn={()=>{
                    isPressing.value = true
                }}
                onPressOut={()=>{
                    if(isPressing.value === true){
                        isPressing.value = false
                    }
                }}
                onPress={()=>{
                    goToCollectionDetails(resource.id)
                }}
                style={{flex:1, alignItems: 'center', marginBottom: index>1?0:24}}>
                <View style={{flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center'}} key={index}>
                    {
                        resource.featured.map((item, index)=>{
                            return (
                                <View style={{margin:4}} key={`${resource.title}_${index}`}>
                                    <Thumbnail src={item.url} width={THUMBNAIL_WIDTH} height={THUMBNAIL_WIDTH} title={item.title} type={"compact"} pretty={false} actionType={item.type} status={'uncompleted'} key={index}/>
                                </View>
                            )
                        })
                    }
                    <View style={{margin:4, width:THUMBNAIL_WIDTH, height:THUMBNAIL_WIDTH, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: kauriColors.primary.dark}}>
                            {(resource.total - resource.featured.length) > 0 && <Text style={{...designSystem.textStyles.captionsBold, color: kauriColors.primary.light}}>
                                +{resource.total - resource.featured.length}
                            </Text>}
                    </View>
                </View>
                <View style={{ width: (THUMBNAIL_WIDTH*2)+8}}>
                    <Text style={{...designSystem.textStyles.captionsBold, textAlign: 'left', color: kauriColors.primary.dark, marginBottom: 4}}>
                        {resource.title}
                    </Text>
                    <Text style={{...designSystem.textStyles.smallTextsSemi, textAlign: 'left', color: hexToRGBA(kauriColors.primary.dark, 0.7)}} numberOfLines={2}>
                        {resource.description}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
})

const SingletonItem = ({item, index, sectionLength, sectionIndex, goToActionDetails}) => {
    const THUMBNAIL_WIDTH = 136;
    const isPressing = useSharedValue(false)

    useEffect(() => {
        isPressing.value = false;
      }, [item.id, isPressing]);

    const $scale = useAnimatedStyle(()=>{
        return {
            transform: [{scale: isPressing.value?withTiming(0.98):withTiming(1)}]
        }
    }, [isPressing])

    return (
            <Animated.View style={[{paddingLeft:16, paddingRight: index=== sectionLength-1?16:0}, $scale]}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPressIn={()=>{
                        isPressing.value = true
                    }}
                    onPressOut={()=>{
                        if(isPressing.value === true){
                            isPressing.value = false
                        }
                    }}
                    onPress={()=>{
                        goToActionDetails(item.id)
                    }}
                    >
                    <Thumbnail src={item.url} width={THUMBNAIL_WIDTH} height={THUMBNAIL_WIDTH} title={item.title} type={"large"} actionType={item.type} pretty={false} status={"uncompleted"} isNew={sectionIndex === 0 && newActions.resources.length>0}/>
                    <View style={{width: THUMBNAIL_WIDTH, marginTop:8}}>
                        <Text style={{...designSystem.textStyles.smallTextsSemi, textAlign: 'left', color: hexToRGBA(kauriColors.primary.dark, 0.7)}} numberOfLines={2}>
                            {item.description}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
   ) 
}

const SkeletonItem = ({item:sectionItem, index: sectionIndex, goToActionDetails, goToCollectionDetails, windowWidth}) => {
    if(sectionItem.type === 'singleton'){
        return (
            <View key={sectionIndex}>
                <View style={{paddingHorizontal: 16, marginBottom: 16}}>
                    <Text style={{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}}>
                        {sectionItem.title}
                    </Text>
                </View>
                <FlashList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={Platform.OS === 'android'?0.95:'normal'}
                    data={sectionItem.resources as singletonResource[]}
                    estimatedItemSize={140}
                    keyExtractor={(item, index) => index + ""}
                    renderItem={({item, index}) => {
                        return (
                            <SingletonItem goToActionDetails={goToActionDetails} sectionLength={sectionItem.resources.length} sectionIndex={sectionIndex} index={index} item={item} key={index}/>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <View key={sectionIndex}>
            <View style={{paddingHorizontal: 16, marginBottom: 8}}>
                    <Text style={{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}}>
                        {sectionItem.title}
                    </Text>
                </View>
            <View style={{flexDirection: "row", flex:1, flexWrap: 'wrap'}}>
                {
                    sectionItem.resources.map((resource, index) => {
                        return (
                            <CollectionItem resource={resource} index={index} key={index} goToCollectionDetails={goToCollectionDetails} windowWidth={windowWidth}/>
                        )
                    })
                }
            </View>
        </View>
    )

}
export const Explore:FC<ExploreProps> = observer(function explore({translationY, scrollRef, navigationProps, data, updateMomentumState, riveHeight}){
    const {width:windowWidth, height: windowHeight} = useWindowDimensions()
    // data.push({id:-1, type: 'singleton', title: '', resources :[]})

    const isFocused = useIsFocused()
    const scrollHandler = ({nativeEvent}) => {
        if(!isFocused){
            return
        }
        translationY.value = nativeEvent.contentOffset.y
    }

    const goToActionDetails = (actionId: string) => {
        navigationProps.navigate('actionDetails', {
            actionId,
            cameFrom: 'actions'
        })
    }


    const goToCollectionDetails = (collectionId: string) => {
        navigationProps.push('collectionDetails', {
            collectionId,
            cameFrom: 'actions'
        })
    }

    return (
        data.length===1?
            <View style={{width: windowWidth, minHeight: windowHeight/2}}>
                <BusyIndicator style="light"/>
            </View>:
            <View style={{width: 390, height: 700}}>
                <FlatList
                    data={data}
                    contentOffset={{x:0, y: translationY.value}}
                    // estimatedItemSize={450}
                    // getItemType={(item) => item.type}
                    onScroll={scrollHandler}
                    onScrollBeginDrag={()=>{
                        updateMomentumState('START')
                    }}
                    onMomentumScrollEnd={()=>{
                        updateMomentumState('ENDED')
                    }}
                    scrollEventThrottle={16}
                    ref={scrollRef}
                    decelerationRate={Platform.OS === 'android'?0.95:'normal'}
                    ItemSeparatorComponent={LineSeparator}
                    keyExtractor={(item, index) => index + ""}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={()=>{
                        return (
                            <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 16, marginBottom: 32}}>
                                <Text style={{...designSystem.textStyles.superTitleSans, color: kauriColors.primary.dark, marginBottom: 8}}>
                                    explore.
                                </Text>
                                <Text style={{textAlign: 'center', ...designSystem.textStyles.captions, width: '80%', color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                                    Here you will see an exhaustive list of actions that will help build a more sustainable lifestyle.
                                </Text>
                            </View>
                        )
                    }}
                    renderItem={({item, index}) => <SkeletonItem item={item} index={index} goToActionDetails={goToActionDetails} goToCollectionDetails={goToCollectionDetails} windowWidth={windowWidth}/>}
                    ListFooterComponent={<View style={{height:230*667/windowHeight, width:'100%'}}/>}
                />
            </View>
    )
})