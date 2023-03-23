import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useRef, useState } from "react";
import { StatusBar, Text, View, ViewStyle } from "react-native";
import { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import type { AppStackParamList } from "../../navigators";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import type { TabStackParamList } from "../Tabs/Tabs";
import debounce from "lodash.debounce";
import useIsReady from "../../utils/useIsReady";
import { RiveHeader } from "../../components";
import { readChips, shopChips } from "../../mockdata";

type ReadProps = CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, "read">,
    NativeStackScreenProps<AppStackParamList>
>
export const Read:FC<ReadProps> = observer(function Read(_props){
    const $containerInsets = useSafeAreaInsetsStyle(["top"])
    const riveHeight = 240
    const translationY = useSharedValue(0)
    const [filterState, setFilterState] = useState({})
    const [isSearching, setIsSearching] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState('')

    const updateReadState = useCallback((key:any)=>{
        console.log(key)
    },[])

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
    
    const updateFilteredState = (key, value) => {
        const previousFilterState = filterState

        const config = {
            ...previousFilterState,
            [key]: value,
        }
        setFilterState(config);
        fetchFilteredData()
    }

    const debounceFilterCall = useCallback(
        debounce((key, value) => {
            updateFilteredState(key, value);
        }, 500),
        [],
    );
    const updateSearchPhrase = (phrase:string) => {
        setSearchPhrase(phrase)
        debounceFilterCall("searchQuery", phrase)
    }

    const searchClicked = (override, searchPhrase:string) => {
        // if(!isSearching){
        //     states[actionsState].scrollToTop()
        // }
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

    return (
        <View style={[$container, $containerInsets]}>
            <StatusBar barStyle={'dark-content'} backgroundColor="#fff"/>
            <RiveHeader translationY={translationY} data={readChips} config={{right: ['customise'],left:["filter", "search"], height: riveHeight}} screenState={updateReadState} isSearching={isSearching} searchClicked={searchClicked} updateSearchPhrase={updateSearchPhrase}/>
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1
}