import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useRef, useState } from "react";
import { Image, StatusBar, Text, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native";
import FastImage from "react-native-fast-image";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { productDetails } from "../../mockdata";
import type { AppStackParamList } from "../../navigators";
import { designSystem, kauriColors } from "../../theme";
import {translate as geti18n} from '../../i18n';
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import type { TabStackParamList } from "../Tabs/Tabs";
import { Hex } from "../../components/Hex";
import { BusyIndicator, CrossBtn, LineSeparator } from "../../components";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { CartIcon, PlusIcon } from "../../svgs";
import { WishlistIcon } from "../../svgs/WishlistIcon";

type ProductDetailProps = CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, 'productDetail'>,
    BottomTabScreenProps<TabStackParamList>
>

export const ProductDetail:FC<ProductDetailProps> = (_props) => {
    const {width: winWidth, height: winHeight} = useWindowDimensions()
    const [productImages, setProductImages] = useState<any[]>([])
    const [variant, setVariant] = useState(0)
    const variantVal = useSharedValue(0)
    const [size, setSize] = useState(0)
    const [isBusy, setIsBusy] = useState(true)
    const [variantLoading, setVariantLoading] = useState(false)
    const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom"])
    const $bottomTabHeight = 56 + Number($containerInsets.paddingBottom) +8
    const productDimType = productDetails.productImages[0][0]?.type
    const IMAGE_HEIGHT = productDimType === 1? winWidth * 3/2:productDimType === 2? winWidth: winWidth * 3/4
    const VARIANT_WIDTH = 48
    const VARIANT_HEIGHT = productDimType === 1? VARIANT_WIDTH * 3/2:productDimType === 2? VARIANT_WIDTH: VARIANT_WIDTH * 3/4


    let {width: logoWidth, height: logoHeight} = Image.resolveAssetSource(productDetails.logo);
    if(logoWidth> logoHeight){
        const desiredLogoWidth =(winWidth - 64)/2
        logoHeight = desiredLogoWidth * logoHeight/logoWidth
        logoWidth = desiredLogoWidth
    }else if(logoWidth === logoHeight){
        logoWidth = (winWidth - 32)/4
        logoHeight = logoWidth
    }else{
        const desiredLogoHeight = (winHeight - 32)/4
        logoWidth = desiredLogoHeight * logoWidth/logoHeight
        logoHeight = desiredLogoHeight
    }

    const translationX = useSharedValue(0)
    const imageCarousel = useRef<any>()
    const $progressAnim = useAnimatedStyle(()=>{
        const featImages = productDetails.productImages[variantVal.value].length
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

    const $selectedVariantBorder:ViewStyle = {
        borderWidth: 2,
        borderColor: productDetails.brandColor,
    }

    const onSizeChange = (index) => {
        setSize(index)
    }

    const onVariantChange = (index) => {
        setVariant(index)
        variantVal.value = index
        setVariantLoading(true)
        imageCarousel.current.scrollTo({index:0,animated:true})
        translationX.value = 0
        setTimeout(() => {
            setProductImages(productDetails.productImages[index])
            setVariantLoading(false)
        }, 1000);
    }

    useEffect(() => {
        setTimeout(()=>{
            setSize(0)
            setIsBusy(false)
            onVariantChange(0)
        }, 600)
    }, [])
    
    return (
        <View style={[$container]}>
            <StatusBar backgroundColor={"#000"} barStyle="light-content"/>
            {isBusy?
                <View style={{width: '100%', height: '100%', backgroundColor: "#fff"}}><BusyIndicator style='light'/></View>:<>
                <ScrollView style={{flex: 1, paddingTop: $containerInsets.paddingTop, backgroundColor: '#000'}} bounces={false}>
                    <View>
                        <Carousel
                            panGestureHandlerProps={{
                                activeOffsetX: [-10, 10],
                            }}
                            loop
                            ref={imageCarousel}
                            width={winWidth}
                            height={IMAGE_HEIGHT}
                            windowSize={winWidth}
                            data={productImages}
                            scrollAnimationDuration={700}
                            onProgressChange={offsetX}
                            renderItem={({item }:{item:any}) => (
                                    <Image
                                        source={item.src}
                                        onLoadStart={() =>
                                           console.log("start:",Date.now())
                                        }
                                        onProgress={(e) => {
                                            console.log(e.nativeEvent)
                                        }}
                                        onLoad={() => console.log("end", Date.now())}
                                        onLoadEnd={() => {}}
                                        style={
                                        {
                                            borderTopLeftRadius:32,
                                            borderTopRightRadius: 32, 
                                            width: winWidth,
                                            height: IMAGE_HEIGHT,
                                        }
                                        }
                                    />
                            )}
                        />
                        <View style={{position: 'absolute', bottom: 0, width: winWidth, backgroundColor: kauriColors.primary.chipBar}}>
                            <Animated.View style={[{ width: winWidth/productDetails.productImages[variant].length, height: 4, backgroundColor: kauriColors.primary.yellow}, $progressAnim]}/>
                        </View>
                        {variantLoading && <View style={{position: 'absolute', bottom:0, top:0, right:0, left:0, borderTopLeftRadius:32, borderTopRightRadius: 32, backgroundColor: hexToRGBA("#fff", 0.9), alignItems: 'center', justifyContent: 'center'}}>
                                        <BusyIndicator style="light" hideLogo/>
                        </View>}
                    </View>
                    <View style={{paddingHorizontal: 16, backgroundColor: '#fff', paddingTop:24, paddingBottom:16}}>
                        <FastImage
                            source={productDetails.logo}
                            style={{
                                height: logoHeight,
                                width: logoWidth
                            }}
                        />
                    </View>
                    <View style={{justifyContent: 'flex-start', backgroundColor: "#fff", width: '100%'}}>
                            <Text style={{...designSystem.textStyles.titleBig, color: kauriColors.primary.dark, paddingHorizontal: 16}}>
                                {productDetails.title}
                            </Text>
                            <Text style={{...designSystem.textStyles.assistantSansBody, color: kauriColors.primary.dark, marginTop:8, paddingHorizontal: 16, fontSize:20}}>
                                {`Rs. ${productDetails.price}`} <Text style={{color: kauriColors.primary.unselectedLight, ...designSystem.textStyles.captionsExtraBold}}>Per U</Text>
                            </Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop:16,}}>
                                    <Text style={{...designSystem.textStyles.captions, color: kauriColors.primary.unselectedLight}}>
                                        {geti18n("shop.sizes")}
                                    </Text>

                            </View>
                            <View style={{paddingHorizontal: 16, flexDirection: 'row', marginTop:8, flexWrap: 'wrap'}}>
                                {
                                    productDetails.sizesAvailable.map((sizes, index) => {
                                        return (
                                            <TouchableOpacity onPress={()=>onSizeChange(index)} key={index} style={[$sizeChip, {marginLeft: index===0?0:8, borderColor: sizes.available?productDetails.brandColor:kauriColors.secondary.uncompleted, backgroundColor: (sizes.available && size=== index)?productDetails.brandColor:'#fff'}]} activeOpacity={0.9} disabled={!sizes.available}>
                                                <Text style={{...designSystem.textStyles.smallTexts, color: sizes.available?size===index?kauriColors.primary.light:productDetails.brandColor:kauriColors.secondary.uncompleted}}>
                                                    {sizes.value}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop:16}}>
                                    <Text style={{...designSystem.textStyles.captions, color: kauriColors.primary.unselectedLight}}>
                                        {geti18n("common.variants")}
                                    </Text>

                            </View>
                            <View style={{flexDirection: 'row', marginTop:8, paddingLeft: 16, flexWrap: 'wrap', alignItems: 'center'}}>
                                {
                                    productDetails.variants.map((variantContent:any, index)=>{
                                        return(
                                            <TouchableOpacity onPress={()=>onVariantChange(index)} style={{marginLeft: index ===0?0:16, borderRadius:4, overflow:'hidden', borderWidth:2, borderColor: '#fff', ...(variant === index && $selectedVariantBorder)}} key={index} activeOpacity={0.9}>
                                                <FastImage
                                                    source={variantContent.src}
                                                    style={
                                                        {
                                                            width: VARIANT_WIDTH,
                                                            height: VARIANT_HEIGHT,
                                                            borderRadius: 4,
                                                            backgroundColor: kauriColors.primary.light
                                                        }
                                                        }
                                                />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            <LineSeparator/>
                            <View style={{ marginBottom: 8, paddingHorizontal: 16}}>
                                    <Text style={{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}}>
                                        {geti18n("actions.causesImpactedHighest")}
                                    </Text>

                            </View>
                            <ScrollView horizontal style={{marginTop:8}} showsHorizontalScrollIndicator={false}>
                                {
                                    productDetails.productContributions.map((cause:any, index)=>{
                                        return(
                                            <TouchableOpacity style={{width:112}} key={index} activeOpacity={0.9}>
                                                <View style={{ alignItems: 'center'}}>

                                                    <Hex dimension={cause.dimension} title={cause.subdimension} titleVisible={!cause.note}/>
                                                    {cause.note && <Text style={{marginTop:0, width:'90%', ...designSystem.textStyles.smallTexts, marginLeft: 8, color: kauriColors.primary.dark, textAlign: 'center'}}>
                                                        {cause.note}
                                                    </Text>}
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>

                            <LineSeparator/>
                            <View style={{ marginBottom: 8, paddingHorizontal: 16}}>
                                    <Text style={{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}}>
                                        {geti18n("shop.howIsItManufactured")}
                                    </Text>
                                    <Text style={{...designSystem.textStyles.paragraph,marginTop:8, color: hexToRGBA(kauriColors.primary.dark, 0.7), fontSize: 16}}>
                                        {productDetails.manufacturing}
                                    </Text>
                            </View>
                            <LineSeparator/>
                            <View style={{ marginBottom: 8, paddingHorizontal: 16}}>
                                    <Text style={{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}}>
                                        {geti18n("shop.whatMaterialsAreUsed")}
                                    </Text>
                                    <Text style={{...designSystem.textStyles.paragraph,marginTop:8, color: hexToRGBA(kauriColors.primary.dark, 0.7), fontSize: 16}}>
                                        {productDetails.manufacturing}
                                    </Text>
                            </View>
                            <View style={{width: '100%', height: $bottomTabHeight*2,}}/>
                    </View>
                </ScrollView>
                <View style={[ $bottomTab, {paddingBottom: $containerInsets.paddingBottom?$containerInsets.paddingBottom:16}]}>
                    <TouchableOpacity style={{...designSystem.card,paddingVertical:16,flexDirection: 'row', flexBasis: '20%',alignItems: 'center', justifyContent: 'center' , backgroundColor: hexToRGBA(kauriColors.primary.chipBar, 0.5)}} activeOpacity={0.9}>
                                <WishlistIcon/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingVertical:16, backgroundColor:productDetails.brandColor , alignItems: 'center', justifyContent: 'center', borderRadius: 10, flexBasis: '60%', flexDirection: 'row'}} activeOpacity={0.9}>
                        <View style={{width: 16}}>
                            <PlusIcon color={kauriColors.primary.light}/>
                        </View>
                        <Text style={{...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.light, marginLeft: 8}}>
                            Add to cart
                        </Text>
                    </TouchableOpacity>
                </View>
                <CrossBtn/>
                <TouchableOpacity activeOpacity={0.9} style={{position: 'absolute', top: $containerInsets.paddingTop?Number($containerInsets.paddingTop)+4:16, left: 16, backgroundColor: hexToRGBA(kauriColors.primary.chipBar, 0.7), padding:6, borderRadius: 24}}>
                    <CartIcon/>
                    <View style={{position: 'absolute', width:16, height: 16, backgroundColor: kauriColors.primary.yellow, borderRadius: 24, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{...designSystem.textStyles.smallTexts, color: kauriColors.primary.dark}}>
                                    2
                                </Text>
                    </View>
                </TouchableOpacity>
            </>}
        </View>
    )
}

const $container:ViewStyle = {
    backgroundColor: '#000',
    flex:1
}

const $bottomTab:ViewStyle = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: kauriColors.primary.light,
    justifyContent: 'space-around',
    // alignItems: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
}

const $sizeChip:ViewStyle = {
    borderWidth:2,
    paddingVertical: 4,
    paddingHorizontal:8,
    borderRadius:50,
}