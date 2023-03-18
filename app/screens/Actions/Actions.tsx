import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, StatusBar, Text, View, ViewStyle } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { RiveHeader } from "../../components";
import { actionsChips, exploreSkeleton, newActions, roadMap } from "../../mockdata";
import useIsReady from "../../utils/useIsReady";
import type { TabStackParamList } from "../Tabs/Tabs";
import { translate as geti18n } from "../../i18n"
import { Explore } from "./Explore";
import { ForYou } from "./ForYou";
import debounce from "lodash.debounce";
import { designSystem, kauriColors } from "../../theme";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { AppStackParamList } from "../../navigators";

type ActionsProps = CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, 'actions'>,
    NativeStackScreenProps<AppStackParamList>
>
export const Actions:FC<ActionsProps> = observer(function Actions(_props){
    const riveHeight = 240
    const translationY = useSharedValue(0)
    const [actionsState, setActionsState] = useState<'forYou' | 'explore' | 'habits' | 'myLibrary'>('forYou');
    const actionsStateValue = useSharedValue('forYou')
    const [filterState, setFilterState] = useState({})
    const [isSearching, setIsSearching] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState('')

    const [pageConfig, setPageConfig] = useState<any[]>([{
        name: 'forYou', 
        data: { count: 0,
                resources: [],
                nextAction: {},
                completed:0
        }}, 
        {name: 'explore', data: []}])

    const [forYouData, setForYouData] = useState<any>({ count: 0,
            resources: [],
            nextAction: {},
            completed:0
    })
    const [exploreData, setExploreData] = useState<any>([])

    const flatRef = useRef<any>()
    const exploreRef = useRef<any>()
    const forYouRef = useRef<any>()
    const states = {'forYou': {index: 0, ref: forYouRef, scrollToTop: () => forYouRef.current.scrollToOffset({offset:0, animated:false})}, 'explore': {index: 1, ref: exploreRef, scrollToTop: () => exploreRef.current.scrollToOffset({offset:0, animated:false})}, 'habits': {index: 2, ref: forYouRef}}
    
    const updateActionsState = useCallback((key:any) =>{
        if(flatRef.current){
            flatRef.current.scrollToIndex({
                index:states[key].index,
                animated: true
            })
        }
        const prevState = actionsStateValue.value
        if(states[prevState].ref.current){
            states[prevState].scrollToTop()
        }
        setTimeout(()=>{
                actionsStateValue.value = key
                setActionsState(key)
        },300)
    },[]);


    useEffect(()=>{
        switch(actionsState){
            case 'forYou':
                if(!forYouData.resources.length){
                    const prevStateConfig = pageConfig
                    prevStateConfig[0].data = roadMap
                    setPageConfig(prevStateConfig)
                    setForYouData(roadMap)
                }
                break
            case 'explore':
                if(!exploreData.length){
                    const prevStateConfig = pageConfig
                    prevStateConfig[1].data = [newActions, ...exploreSkeleton]
                    setPageConfig(prevStateConfig)
                    setExploreData([newActions, ...exploreSkeleton])
                }
                break
            case 'habits':
            case 'myLibrary':
        }
        fetchFilteredData()
    }, [actionsState])

    const isReady = useIsReady()
    const filteredData = []
    const onViewableItemsChanged = useRef(() => {
        // console.log("Visible items are", viewChange.viewableItems);
        // console.log("Changed in this iteration", changed);
    })

    const fetchFilteredData = () =>{
        // console.log("API call here")
        // console.log("filterState", config)
        // console.log("pagetype:", pageType)
    }
    
    const updateFilteredState = (key, value, pageType) => {
        const previousFilterState = filterState

        const config = {
            ...previousFilterState,
            [key]: value,
        }
        setFilterState(config);
        fetchFilteredData()
    }

    const debounceFilterCall = useCallback(
        debounce((key, value, pageType) => {
            updateFilteredState(key, value, pageType);
        }, 500),
        [],
    );
    const updateSearchPhrase = (phrase:string) => {
        setSearchPhrase(phrase)
        debounceFilterCall("searchQuery", phrase, actionsState)
    }

    const searchClicked = (override, searchPhrase:string) => {
        if(!isSearching){
            states[actionsState].scrollToTop()
        }
        if(searchPhrase.length !== 0){
            return
        }
        if(override !== undefined){
            setIsSearching(override)
            return
        }
        setIsSearching(prev => !prev)
    }

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
                        <ForYou riveHeight={riveHeight} translationY={translationY} actionsStateValue={actionsStateValue} scrollRef={forYouRef} navigationProps={_props.navigation} data={item.data}/>
                    </Animated.View>
            )
        }else{
            return(
                    <Animated.View style={$scrollContainer_animated}>
                        <Explore riveHeight={riveHeight} translationY={translationY} actionsStateValue={actionsStateValue} scrollRef={exploreRef} navigationProps={_props.navigation} data={item.data}/>
                    </Animated.View>
            )
        }
    },[])

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
                data={pageConfig}
                scrollEnabled={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50
                }}
                renderItem={(childData) => renderSubview(childData)}
            />:<View>
            <Text>Busy</Text>
        </View>}
            {isSearching && <Animated.View style={[$scrollContainer_animated, {position: 'absolute', width: "100%", height: '100%'}]}>
                 {filteredData.length === 0?
                    <View style={{backgroundColor: '#fff', flex:1, alignItems: 'center'}}>
                        <Text style={{...designSystem.textStyles.subtitle, color: kauriColors.primary.unselectedLight}}>
                            {geti18n(`actions.searchMessage.${actionsState}`)}
                        </Text>
                    </View>:
                    <FlatList
                        keyExtractor={(item, index) => ""+index}
                        data={filteredData}
                        renderItem={({item, index})=>{
                            return(
                                <View>
                                    <Text>
                                        {item} {index}
                                    </Text>
                                </View>
                            )
                        }}
                    />
                }
            </Animated.View>}
            <RiveHeader translationY={translationY} data={actionsChips} config={{right: ["customise"],left:["filter", "search"], height: riveHeight}} screenState={updateActionsState} isSearching={isSearching} searchClicked={searchClicked} updateSearchPhrase={updateSearchPhrase}/>
        </Animated.View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1
}

