import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import type { AppStackParamList } from "../../navigators";
import type { TabStackParamList } from "../Tabs/Tabs";
import {Text, TouchableOpacity, useWindowDimensions, View, ViewStyle} from 'react-native'
import { BusyIndicator, Header, PlaylistListItem, Thumbnail } from "../../components";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import { collectionDetail, getCollectionDetails } from "../../mockdata/collectionDetails";
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import {translate as geti18n} from '../../i18n';
import { designSystem, kauriColors } from "../../theme";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { PlusIcon, ShareIcon, ShuffleIcon } from "../../svgs";
import { Completion } from "./Completion";

type CollectionDetails = CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, 'collectionDetails'>,
    BottomTabScreenProps<TabStackParamList>
>

export const CollectionDetails:FC<CollectionDetails> = observer(function CollectionDetails(_props){
    const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom"]);
    const {collectionId, cameFrom} = _props.route.params
    const {width:windowWidth} = useWindowDimensions()
    const [busy, setBusy] = useState(true)
    const [completedActions, setCompletedActions] = useState(0)

    const THUMBNAIL_WIDTH = (((windowWidth - (32*2))/2)-8)/2
    
    const [item, setItem] = useState<collectionDetail>({
        id: 0,
        title: '',
        description: '',
        owner: '',
        likes: 0,
        totalDimensions: 0,
        total: 0,
        resources: []
    })

    const goToActionDetails = (actionId: string) => {
        _props.navigation.navigate('actionDetails', {
            actionId,
            cameFrom: 'actions'
        })
    }

    useEffect(() => {
        setTimeout(()=>{
            const fetchedData = getCollectionDetails(collectionId)
            setItem(fetchedData)
            let count = 0
            fetchedData.resources.forEach((resource)=>{
                if(resource.status === 'completed'){
                    count +=1
                }
            })
            setCompletedActions(count)
            setBusy(false)
        }, 300)
    }, [])

    const translationY = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event)=>{
            translationY.value = event.contentOffset.y
        }
    })

    return (
        <View style={{...$container, paddingTop: $containerInsets.paddingTop}}>
            { busy?
                <BusyIndicator/>:
                <>
                    <Animated.ScrollView showsVerticalScrollIndicator={false} onScroll={scrollHandler} scrollEventThrottle={16} style={{paddingTop: 40}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={[{flexBasis:"50%",}]}>
                                <View style={{flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center'}}>
                                    {
                                        item.resources.slice(0,3).map((resource, index)=>{
                                            return (
                                                <View style={{margin:4}} key={`${resource.title}_${index}`}>
                                                    <Thumbnail src={resource.url} width={THUMBNAIL_WIDTH} height={THUMBNAIL_WIDTH} title={resource.title} type={"compact"} pretty={false} actionType={resource.type} index={index} activeIndexVal={null} stacked={false} status={'uncompleted'} key={index}/>
                                                </View>
                                            )
                                        })
                                    }
                                    <View style={{margin:4, width:THUMBNAIL_WIDTH, height:THUMBNAIL_WIDTH, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: kauriColors.primary.dark}}>
                                            {(item.total - 3) > 0 && <Text style={{...designSystem.textStyles.captionsBold, color: kauriColors.primary.light}}>
                                                +{item.total - 3}
                                            </Text>}
                                    </View>
                                </View>
                        </View>
                    </View>
                    <View style={{width: '100%', paddingHorizontal: 16, marginTop: 16}}>
                        <Text style={{...designSystem.textStyles.titleSmall, color: kauriColors.primary.dark}}>
                            {item.title}
                        </Text>
                        <Text style={{...designSystem.textStyles.smallTextsSemi, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                            {geti18n("actions.contributedBy")} {item.owner} • {item.likes} {geti18n("common.likes")} • {item.total} {geti18n("common.actions")}
                        </Text>
                        <Text style={{...designSystem.textStyles.paragraph, marginTop:16, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                            {item.description}
                        </Text>
                    </View>
                    <Completion total={item.total} completed={completedActions}/>
                        <View style={{marginTop: 24, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', ...designSystem.card}} activeOpacity={0.9}>
                                <View style={{width: 16}}>
                                    <PlusIcon color={kauriColors.primary.dark}/>
                                </View>
                                <Text style={{...designSystem.textStyles.smallTextsSemi, marginLeft: 8, color: kauriColors.primary.dark}}>
                                    {geti18n("actions.addToLibrary")}
                                </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', ...designSystem.card}} activeOpacity={0.9}>
                                <View style={{width: 16}}>
                                    <ShuffleIcon color={kauriColors.primary.dark}/>
                                </View>
                                <Text style={{...designSystem.textStyles.smallTextsSemi, marginLeft: 8, color: kauriColors.primary.dark}}>
                                    {geti18n("actions.randomAction")}
                                </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', ...designSystem.card}} activeOpacity={0.9}>
                                <View style={{height: 18}}>
                                    <ShareIcon color={kauriColors.primary.dark}/>
                                </View>
                                <Text style={{...designSystem.textStyles.smallTextsSemi, marginLeft: 8, color:kauriColors.primary.dark}}>
                                    {geti18n("actions.shareCollection")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    <View style={{marginTop: 24}}>
                        {
                            item.resources.map((resource, index)=>{
                                return (
                                    <PlaylistListItem id={resource.id} url={resource.url} title={resource.title} index={index+1} status={resource.status} type={resource.type} onPress={goToActionDetails} key={index}/>
                                )
                            })
                        }
                    </View>
                    <View style={{height: $containerInsets.paddingBottom, width: '100%', marginBottom: 36}}/>
                    </Animated.ScrollView>
                    <Header backTitle={geti18n(`common.${cameFrom}`)} onBackPress={()=>_props.navigation.goBack()} title={`${item.title} • ${item.owner}`} translationY={translationY}/>
                </>
            }
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1,
}