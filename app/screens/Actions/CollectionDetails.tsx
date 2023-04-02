import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useState } from "react";
import type { AppStackParamList } from "../../navigators";
import type { TabStackParamList } from "../Tabs/Tabs";
import {StatusBar, Text, TouchableOpacity, useWindowDimensions, View, ViewStyle} from 'react-native'
import { BusyIndicator, CrossBtn, Header, PlaylistListItem, Thumbnail } from "../../components";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import { collectionDetail, getCollectionDetails } from "../../mockdata/collectionDetails";
import Animated, { useSharedValue } from "react-native-reanimated";
import {translate as geti18n} from '../../i18n';
import { designSystem, kauriColors } from "../../theme";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { KauriLogo, PlusIcon, ShareIcon, ShuffleIcon } from "../../svgs";
import { Completion } from "./Completion";
import { FlashList } from "@shopify/flash-list";
import { FlatList } from "react-native-gesture-handler";

type CollectionDetails = CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, 'collectionDetails'>,
    BottomTabScreenProps<TabStackParamList>
>

export const CollectionDetails:FC<CollectionDetails> = observer(function CollectionDetails(_props){
    const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom"]);
    const {collectionId, cameFrom} = _props.route.params
    const {width:windowWidth, height:windowHeight} = useWindowDimensions()
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
        _props.navigation.push('actionDetails', {
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
        }, 600)
    }, [])

    const translationY = useSharedValue(0)

    const scrollHandler = ({nativeEvent}) => {
        translationY.value = nativeEvent.contentOffset.y
    }

    const HeaderComponent = () =>{
        return (
            <View style={{paddingTop: 40, paddingBottom: 24, borderTopLeftRadius:32,
                borderTopRightRadius: 32, backgroundColor: "#fff"}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View style={[{flexBasis:"50%",}]}>
                                <View style={{flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center'}}>
                                    {
                                        item.resources.slice(0,3).map((resource, index)=>{
                                            return (
                                                <View style={{margin:4}} key={`${resource.title}_${index}`}>
                                                    <Thumbnail src={resource.url} width={THUMBNAIL_WIDTH} height={THUMBNAIL_WIDTH} title={resource.title} type={"compact"} pretty={false} actionType={resource.type} status={'uncompleted'} key={index}/>
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
                        <Text style={{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}}>
                            {item.title}
                        </Text>
                        <Text style={{...designSystem.textStyles.smallTextsSemi, marginTop:8, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                            {geti18n("actions.contributedBy")} {item.owner==='Kauri'?<View style={{height: 10}}><KauriLogo/></View>:item.owner} • {item.likes} {geti18n("common.likes")} • {item.total} {geti18n("common.actions")}
                        </Text>
                        <Text style={{...designSystem.textStyles.captions, marginVertical:16, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                            {item.description}
                        </Text>
                    </View>
                    <Completion total={item.total} completed={completedActions}/>
                    <View style={{marginTop: 24, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', ...designSystem.card}}>
                            <View style={{width: 16}}>
                                <PlusIcon color={kauriColors.primary.dark}/>
                            </View>
                            <Text style={{...designSystem.textStyles.smallTextsSemi, marginLeft: 8, color: kauriColors.primary.dark}}>
                                {geti18n("actions.addToLibrary")}
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', ...designSystem.card}}>
                            <View style={{width: 16}}>
                                <ShuffleIcon color={kauriColors.primary.dark}/>
                            </View>
                            <Text style={{...designSystem.textStyles.smallTextsSemi, marginLeft: 8, color: kauriColors.primary.dark}}>
                                {geti18n("actions.randomAction")}
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', ...designSystem.card}}>
                            <View style={{height: 18}}>
                                <ShareIcon color={kauriColors.primary.dark}/>
                            </View>
                            <Text style={{...designSystem.textStyles.smallTextsSemi, marginLeft: 8, color:kauriColors.primary.dark}}>
                                {geti18n("actions.shareCollection")}
                            </Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }

    const _renderItem = useCallback(
      ({item:resource, index}) => {
        return (
            <PlaylistListItem id={resource.id} url={resource.url} title={resource.title} index={index+1} status={resource.status} type={resource.type} onPress={goToActionDetails} key={index}/>
        )
      },
      [item.resources],
    )
    
    return (
        <View style={{...$container, paddingTop: $containerInsets.paddingTop}}>
            <StatusBar backgroundColor={"#000"} barStyle="light-content"/>
            { busy?
            <View style={{width: '100%', minHeight: '100%', backgroundColor: '#fff'}}>
                <BusyIndicator style="light"/>
            </View>
                :
                <>
                    <Animated.View style={{ height: windowHeight}}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={item.resources}
                            keyExtractor={(item, index) => index + ""}
                            ListHeaderComponent={HeaderComponent}
                            ListFooterComponent={<View style={{height: $containerInsets.paddingBottom, width: '100%', backgroundColor:"#fff"}}/>}
                            initialNumToRender={30}
                            // estimatedItemSize={80}
                            ItemSeparatorComponent={() =><View style={{backgroundColor: "#fff"}}>   
                                    <View style={{height: 1.25, backgroundColor: kauriColors.primary.light, width: '80%', marginLeft: '10%', marginRight: '10%'}}/>
                                </View> 
                            }
                            onScroll={scrollHandler}
                            scrollEventThrottle={16}
                            renderItem={_renderItem}
                        />
                    </Animated.View>
                    <CrossBtn/>
                    {/* <Header backTitle={geti18n(`common.${cameFrom}`)} onBackPress={()=>_props.navigation.goBack()} title={`${item.title} • ${item.owner}`} translationY={translationY}/> */}
                </>
            }
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor: "#000",
    flex: 1,
}