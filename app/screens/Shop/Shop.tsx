import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useIsFocused, useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { StatusBar, Text, useWindowDimensions, View, ViewStyle, Image, Platform, ScrollView } from "react-native";
import Animated, { Extrapolate, interpolate, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import type { AppStackParamList } from "../../navigators";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import type { TabStackParamList } from "../Tabs/Tabs";
import debounce from "lodash.debounce";
import useIsReady from "../../utils/useIsReady";
import { RiveHeader } from "../../components";
import { shopChips, shopData, shopDataAlt, shopDataRefills, shopFeatImages } from "../../mockdata";
import { MasonryFlashList } from "@shopify/flash-list";
import { dimensionColorMap } from "../../utils/hexDetails";
import { designSystem, kauriColors } from "../../theme";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { RefillIcon } from "../../svgs";
import { hexToRGBA } from "../../utils/hexToRGBA";
import useScrollToTop from "../../utils/useScrollToTop";

type ShopProps = CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, "shop">,
    NativeStackScreenProps<AppStackParamList>
>

function useInterval(callback, delay) {
    const savedCallback = useRef<any>();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

const ImagePlayer = ({translationY}:{translationY: SharedValue<number>}) => {
    const { height:winHeight, width: winWidth} = useWindowDimensions()
    const featImages = 3
    const translationX = useSharedValue(0)
    const $opacityAnim = useAnimatedStyle(()=>{
        return (
            {
                opacity: interpolate(
                    translationY.value,
                    [0, winWidth+48],
                    [1, 0],
                    Extrapolate.CLAMP
                )
            }
        )
    }, [translationY])
    
    const $progressAnim = useAnimatedStyle(()=>{
        let translateX;
        let transX = translationX.value
        if(transX > 0 ) {
            transX = transX - featImages * winWidth
        }
        translateX = interpolate(
            transX,
            [-winWidth*(featImages), -winWidth*(featImages-1), 0],
            [0, (featImages-1)*winWidth/featImages, 0],
            Extrapolate.CLAMP
        )
        return {
            transform: [
                {translateX: translateX}
            ]
        }
    }, [translationX])

    const offsetX = (offsetProgress) => {
        translationX.value = offsetProgress
    }

    return (
        <Animated.View style={[{ 
        position: 'absolute',
        bottom: 64,}, $opacityAnim]}>
            <Carousel
                loop
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
                width={winWidth}
                height={winWidth}
                autoPlay={true}
                windowSize={winWidth}
                data={[...new Array(shopFeatImages.length).keys()]}
                scrollAnimationDuration={700}
                autoPlayInterval={2000}
                // onSnapToItem={offsetX}
                onProgressChange={offsetX}
                renderItem={({ index }:{index:number}) => (
                        <Image
                            source={shopFeatImages[index]}
                            style={
                            {
                                width: winWidth,
                                height: winWidth
                            }
                            }
                        />
                )}
            />
            <View style={{position: 'absolute', bottom: 0, width: winWidth, backgroundColor: kauriColors.primary.chipBar}}>
                <Animated.View style={[{ width: winWidth/featImages, height: 4, backgroundColor: kauriColors.primary.yellow}, $progressAnim]}/>
            </View>
        </Animated.View>
  )
}


const ShopListItemImageContainer = ({item, IMAGE_WIDTH}) => {
    if(item.type === '1'){
        return (
            <FastImage
                source={item.src as any}
                resizeMode={'cover'}
                style={{
                    borderRadius: 12,
                    width: IMAGE_WIDTH,
                    height: IMAGE_WIDTH * 3/2,
                    marginBottom: 4,
                }}
            />
        )
    }
    if(item.type === '2'){
        return ( 
            <FastImage
                source={item.src as any}
                resizeMode={'cover'}
                style={{
                    borderRadius: 12,
                    width: IMAGE_WIDTH,
                    height: IMAGE_WIDTH,
                    marginBottom: 4,
                }}
            />
        )
    }
    if(item.type === '3'){
        return (
            <FastImage
                source={item.src as any}
                resizeMode={'cover'}
                style={{
                    borderRadius: 12,
                    width: IMAGE_WIDTH,
                    height: IMAGE_WIDTH * 3/4,
                    marginBottom: 4,
                }}
            />
        )
    }
    return <View/>
}
const ShopListItem = ({item, index, IMAGE_WIDTH, onPress}:{item: any, index: any, IMAGE_WIDTH:number, onPress: (productId:string) => void}) => {
    const $pressIn = useSharedValue(false)
    const navigation = useNavigation()
    const $animatedStyles = {
        scale: useAnimatedStyle(()=>{
          return {
                transform: [
                    {scale: $pressIn.value? withTiming(0.98): withTiming(1)}
                ]
          }
        }, [$pressIn])
    }
    return (
        <View>
            <TouchableOpacity 
                onPressIn={()=>{$pressIn.value = true}}
                onPressOut={()=>{$pressIn.value = false}}
                onPress={()=> onPress(item.id)}
                style={{marginLeft: index % 2 === 0?8:4,
                marginRight: index % 2 === 0?4:8,
                marginVertical:12}}
                activeOpacity={0.9}
                >
                <Animated.View style={$animatedStyles.scale}>
                    <ShopListItemImageContainer item={item} IMAGE_WIDTH={IMAGE_WIDTH}/>
                    <View style={{marginLeft: 8}}>
                        <Text numberOfLines={2} style={{...designSystem.textStyles.captionsMediumBold, color: kauriColors.primary.dark, letterSpacing: -0.5}}>
                            {item.title}
                        </Text>
                        <Text style={{...designSystem.textStyles.smallTexts, color: kauriColors.primary.dark}}>
                            {`Rs. ${item.price}`}
                        </Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
            {item.refillable && 
            <View style={{position: 'absolute', left: 16, top:16,}}>
                <TouchableOpacity hitSlop={{top:8, bottom:8, right:8, left:8}} activeOpacity={0.5} style={{
                                alignItems: 'center', 
                                width:28, height:28, 
                                backgroundColor: hexToRGBA(dimensionColorMap()['dimension2'], 1), 
                                justifyContent: 'center', 
                                borderRadius: 28, 
                                borderWidth: 1,
                                borderColor: '#fff',
                                }}>
                    <View style={{height: 20}}>
                        <RefillIcon color={'#fff'}/>
                    </View>
                </TouchableOpacity>
            </View>
            }
        </View>
    )
}
export const Shop:FC<ShopProps> = observer(function Shop(_props){
    const {width:windowWidth, height:windowHeight} = useWindowDimensions()
    const IMAGE_WIDTH =( windowWidth - (8*3))/2
    const $containerInsets = useSafeAreaInsetsStyle(["top"])
    const [data, setData] = useState(shopData)
    let riveHeight = windowWidth + 48
    
    // if($containerInsets.paddingTop && typeof $containerInsets.paddingTop === "number"){
    //     riveHeight = riveHeight - $containerInsets.paddingTop
    // }
    const translationY = useSharedValue(0)
    const [filterState, setFilterState] = useState({})
    const [isSearching, setIsSearching] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState('')
    const scrollRef = useRef<any>()
    const velocity = useSharedValue(0)
    const momentumState = useSharedValue('ENDED')

    const scrollToTop = () => {
        if(scrollRef.current){
            if(momentumState.value === 'ENDED' || Platform.OS === 'ios'){
                scrollRef.current.scrollToOffset({offset:0, animated:true})
                translationY.value = withTiming(0)
            }
        } 
    }
    useScrollToTop(scrollRef, () => scrollToTop())

    const updateShopState = useCallback((key:any)=>{
        let rand;
        if(key === 'refillAvailable'){
            rand = shopDataRefills
        }else{
            const dataAvailable = [shopData, shopDataAlt]
            rand = dataAvailable[Math.floor(Math.random() * dataAvailable.length)] 
        }
        if(scrollRef.current){
            scrollRef.current.scrollToOffset({offset:0, animated: Platform.OS === 'ios'})
        }
        if(rand){
            setIsLoading(true)
            setTimeout(()=>{
                setData(rand)
                setIsLoading(false)
                if(scrollRef.current){
                    scrollRef.current.scrollToOffset({offset:0, animated:true})
                }
            }, 500)
        }
        
    },[])

    const isReady = useIsReady()
    const filteredData = []

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

    const goToProductDetail = (productId: string) => {
        _props.navigation.navigate('productDetail', {
            productId,
            cameFrom: 'shop'
        })
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
        const translateY = interpolate(
            translationY.value,
            [0, riveHeight+100],
            [riveHeight, 120],
            Extrapolate.CLAMP
        )
        return {
            transform:[
                {translateY: translateY}
            ]
        }
    }, [translationY])
    const columnCount = 2;

    const isFocused = useIsFocused()
    const scrollHandler = ({nativeEvent}) => {
        if(!isFocused){
            return
        }
        translationY.value = nativeEvent.contentOffset.y
    }

    const _renderItem = ({item, index}) => {

        return (
            <ShopListItem item={item} index={index} IMAGE_WIDTH={IMAGE_WIDTH} onPress={goToProductDetail}/>
        )
    }

    const skeletonData = new Array(10).fill(null).map((_, index) => {
        return {
          index,
          height: ((index * 10) + 200) / ((index % columnCount) + 1),
        };
      });

    return (
        <View style={[$container]}>
            <StatusBar barStyle={'dark-content'} backgroundColor={"#fff"}/>
            <Animated.View style={[$scrollContainer_animated, {flex:1, height: windowHeight*2}]}>
                {isLoading?
                        <MasonryFlashList
                        estimatedListSize={{height: windowHeight, width: windowWidth}}
                        data={skeletonData}
                        scrollEnabled={false}
                        numColumns={columnCount}
                        estimatedItemSize={330}
                        keyExtractor={(item, index) => index + ""}
                        renderItem={({item, index}) => {
                            return (
                                <View
                                style={{
                                    height: item.height,
                                    backgroundColor: kauriColors.primary.light,
                                    margin: 2,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 10,
                                }}
                                >
                                </View>
                            )
                        }}
                    />
                    :
                    <MasonryFlashList
                    estimatedListSize={{height: windowHeight, width: windowWidth}}
                    getItemType={(item) => item.type}
                    data={data}
                    scrollEnabled={true}
                    onScrollBeginDrag={()=>{
                        momentumState.value = 'START'
                    }}
                    onMomentumScrollEnd={()=> {
                        momentumState.value = 'ENDED'
                    }}
                    ref={scrollRef}
                    decelerationRate={Platform.OS === 'android'?0.95:'normal'}
                    numColumns={columnCount}
                    estimatedItemSize={300}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    keyExtractor={(item, index) => index + ""}
                    renderItem={_renderItem}
                    ListFooterComponent={<View style={{height:200, width:'100%'}}/>}
                />}
            </Animated.View>
            <RiveHeader ImagePlayer={ImagePlayer} short={true} translationY={translationY} data={shopChips} config={{right: ['wishlist','cart'],left:["filter", "search"], height: riveHeight}} screenState={updateShopState} isSearching={isSearching} searchClicked={searchClicked} updateSearchPhrase={updateSearchPhrase} lottiePlayerDisabled={true}/>
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1
}