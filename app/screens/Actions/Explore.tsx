import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Animated, { runOnJS, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { StylisedTitle, Thumbnail } from "../../components";
import { BusyIndicator } from "../../components/BusyIndicator";
import { exploreSkeleton, newActions, singletonResource, skeleton } from "../../mockdata";
import { designSystem, kauriColors } from "../../theme";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";

export interface ExploreProps{
    riveHeight: number,
    translationY: SharedValue<number>,
    actionsStateValue: SharedValue<string>,
    scrollRef: React.MutableRefObject<any>,
}

export const Explore:FC<ExploreProps> = observer(function explore({actionsStateValue, translationY, scrollRef}){
    const {width:windowWidth, height:windowHeight} = useWindowDimensions()
    let skeleton = [newActions]
    skeleton = [...skeleton, ...exploreSkeleton, {id:-1, type: 'singleton', title: '', resources :[]}]
    const [busy, setBusy] = useState(true)
    const $containerInsets = useSafeAreaInsetsStyle(['bottom', 'top']);

    const fetchSkeleton = () => {
        setTimeout(()=>{
            // console.log(JSON.stringify(skeleton))
            console.log("fetched skeleton successfully...")
            setBusy(false)
        }, 300)
    }
    useDerivedValue(()=>{
        if(actionsStateValue.value === 'explore'){
            console.log("fetching skeleton...")
            //fetch promises here
            runOnJS(fetchSkeleton)()
        }
    }, [actionsStateValue])

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event)=>{
            translationY.value = event.contentOffset.y
        }
    })

    const SingletonItem = ({item, index, sectionLength, sectionIndex}) => {
        const THUMBNAIL_WIDTH = 136;
        const isPressing = useSharedValue(false)

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
                            console.log("on press")
                        }}
                        >
                        <Thumbnail src={item.url} width={THUMBNAIL_WIDTH} height={THUMBNAIL_WIDTH} title={item.title} type={"large"} actionType={item.type} activeIndexVal={null} index={index} pretty={false} stacked={false} status={"uncompleted"} isNew={sectionIndex === 0 && newActions.resources.length>0}/>
                        <View style={{width: THUMBNAIL_WIDTH, marginTop:8}}>
                            <Text style={{...designSystem.textStyles.smallTextsSemi, textAlign: 'left', color: hexToRGBA(kauriColors.primary.dark, 0.6)}} numberOfLines={2}>
                                {item.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
       ) 
    }

    const CollectionItem = ({resource, index}) => {
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
                        console.log("on press")
                    }}
                    style={{flex:1, alignItems: 'center', marginBottom:24}}>
                    <View style={{flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center'}} key={index}>
                        {
                            resource.featured.map((item, index)=>{
                                return (
                                    <View style={{margin:4}} key={`${resource.title}_${index}`}>
                                        <Thumbnail src={item.url} width={THUMBNAIL_WIDTH} height={THUMBNAIL_WIDTH} title={item.title} type={"compact"} pretty={false} actionType={item.type} index={index} activeIndexVal={null} stacked={false} status={'uncompleted'} key={index}/>
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
                        <Text style={{...designSystem.textStyles.smallTextsSemi, textAlign: 'left', color: hexToRGBA(kauriColors.primary.dark, 0.6)}} numberOfLines={2}>
                            {resource.description}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    const _renderItem = useCallback(({item:sectionItem, index:sectionIndex}:{item:skeleton, index: number}) => {
        if(sectionItem.id === -1){
            return (
                <View style={{height:200, width:'100%'}}>
                </View>
            )
        }

        if(sectionItem.type === 'singleton'){
            return (
                <View style={[{marginBottom:40}, ]}>
                    <View style={{paddingHorizontal: 16, marginBottom: 24}}>
                        <StylisedTitle text={sectionItem.title} alt={false} small/>
                    </View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={sectionItem.resources as singletonResource[]}
                        maxToRenderPerBatch={4}
                        keyExtractor={(item, index) => index + ""}
                        renderItem={({item, index}) => {
                            return (
                                <SingletonItem sectionLength={sectionItem.resources.length} sectionIndex={sectionIndex} index={index} item={item} key={index}/>
                            )
                        }}
                    />
                </View>
            )
        }

        return (
            <View style={{marginBottom:40-24}}>
                <View style={{paddingHorizontal: 16, marginBottom: 24}}>
                    <StylisedTitle text={sectionItem.title} alt={false} small/>
                </View>
                <View style={{flexDirection: "row", flex:1, flexWrap: 'wrap'}}>
                    {
                        sectionItem.resources.map((resource, index) => {
                            return (
                                <CollectionItem resource={resource} index={index} key={index}/>
                            )
                        })
                    }
                </View>
            </View>
        )
    },[])
    return (
        <View style={{width: windowWidth}}>
            {
                busy?
                <BusyIndicator/>:
                <Animated.FlatList
                    nestedScrollEnabled={true}
                    data={skeleton}
                    maxToRenderPerBatch={10}
                    bounces={false}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index + ""}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    ref={scrollRef}
                    onScroll={scrollHandler}
                />
            }
        </View>
    )
})