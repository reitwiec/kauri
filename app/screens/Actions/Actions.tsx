import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, StatusBar, Text, View, ViewStyle } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { RiveHeader } from "../../components";
import { actionsChips } from "../../mockdata";
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

    const flatRef = useRef<any>()
    const exploreRef = useRef<any>()
    const forYouRef = useRef<any>()
    const states = {'forYou': {index: 0, ref: forYouRef, scrollToTop: () => forYouRef.current.scrollToOffset({offset:0, animated:false})}, 'explore': {index: 1, ref: exploreRef, scrollToTop: () => exploreRef.current.scrollTo({x: 0, y: 0, animated: true})}, 'habits': {index: 2, ref: forYouRef}}
    const updateActionsState = useCallback((key:any) =>{
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
                    states[prevState].scrollToTop()
                }
            },300)
    },[]);

    useEffect(()=>{
        fetchFilteredData(filterState, actionsState)
    }, [actionsState])

    const isReady = useIsReady()
    const filteredData = []
    const onViewableItemsChanged = useRef(() => {
        // console.log("Visible items are", viewableItems);
        // console.log("Changed in this iteration", changed);
    })

    const fetchFilteredData = (config, pageType) =>{
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
        console.log(pageType)
        fetchFilteredData(config, pageType)
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
                        <ForYou riveHeight={riveHeight} translationY={translationY} actionsStateValue={actionsStateValue} scrollRef={forYouRef} navigationProps={_props.navigation} />
                    </Animated.View>
            )
        }else{
            return(
                    <Animated.View style={$scrollContainer_animated}>
                        <Explore riveHeight={riveHeight} translationY={translationY} actionsStateValue={actionsStateValue} scrollRef={exploreRef} navigationProps={_props.navigation}/>
                    </Animated.View>
            )
        }
    },[])

    const isFocused = useIsFocused()

    useEffect(()=>{
        if(!isFocused){
            const activeRef = states[actionsState]
            setTimeout(()=>{
                activeRef.scrollToTop()
            }, 300)
        }
    }, [isFocused])

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
            <RiveHeader translationY={translationY} data={actionsChips} config={{right: ["customise"],left:["filter", "search"], height: riveHeight}} screenState={updateActionsState} isSearching={isSearching} searchClicked={searchClicked} updateSearchPhrase={updateSearchPhrase} searchPhrase={searchPhrase}/>
        </Animated.View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1
}

