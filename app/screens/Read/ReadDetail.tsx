import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import type { CompositeScreenProps } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FC, useEffect, useState } from "react"
import { Image, ScrollView, StatusBar, Text, TextStyle, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native"
import Animated, { useSharedValue } from "react-native-reanimated"
import { hexIntro } from "../../mockdata"
import type { AppStackParamList } from "../../navigators"
import { CrossIcon, KauriLogo, ShareIcon } from "../../svgs"
import { designSystem, kauriColors, kauriTypography } from "../../theme"
import {translate as geti18n} from '../../i18n';
import { hexToRGBA } from "../../utils/hexToRGBA"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import type { TabStackParamList } from "../Tabs/Tabs"
import LinearGradient from "react-native-linear-gradient"
import { BusyIndicator, Header } from "../../components"
import { SharedElement } from "react-navigation-shared-element"
import { FlashList } from "@shopify/flash-list"
import { Hex } from "../../components/Hex"

type ReadDetailProps = CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, 'readDetail'>,
    BottomTabScreenProps<TabStackParamList>
>

const ReadDetail:FC<ReadDetailProps> = ({navigation, route}) => {
    const {width:windowWidth, height: windowHeight} = useWindowDimensions()
    const [isBusy, setIsBusy] = useState(true)
    const $containerInsets = useSafeAreaInsetsStyle(['top'])
    const backgroundColor = "#fff"
    const translationY = useSharedValue(0)
    useEffect(() => {
      setTimeout(() => {
        setIsBusy(false)
    }, 1200);
    }, [])

    const scrollHandler = ({nativeEvent}) => {
        translationY.value = nativeEvent.contentOffset.y
    }

    
    return (
        <View style={{backgroundColor: backgroundColor, flex:1}}>
            <StatusBar barStyle={'light-content'} backgroundColor={hexToRGBA("#25170E", 0.7)}/>
            {isBusy? 
                <View style={{width: windowWidth, minHeight: windowHeight/2}}>
                    <BusyIndicator style="light"/>
                </View>:<ScrollView bounces={false} onScroll={scrollHandler} scrollEventThrottle={16}>
                <Animated.View style={[{ overflow:'hidden' , backgroundColor: kauriColors.primary.light, borderRadius:0,}]}>
                                    <Animated.View style={[{backgroundColor: hexToRGBA("#25170E", 0.9), zIndex: 2, padding:16, paddingTop:$containerInsets.paddingTop, position:'absolute', width:'100%', top:0}]}>
                                            <Text style={{...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.chipBar}}>
                                                3 MIN READ
                                            </Text>
                                            <Text style={{...designSystem.textStyles.titleBigger, color: kauriColors.primary.light, width: '70%'}}>
                                                {hexIntro.title}
                                            </Text>
                                    </Animated.View>
                                <View>
                                    <Animated.View style={{width: windowWidth, height:4*windowWidth/3}}>
                                        <Image
                                            source={hexIntro.url}
                                            style={{width: '100%', height:'100%', resizeMode: 'cover'}}
                                        />
                                    </Animated.View>
                                </View>
                </Animated.View>
                <View style={{paddingHorizontal: 32}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
                        <View style={{height: 20}}><KauriLogo/></View>
                        <View
                            style={{
                            borderRadius: 50,
                            backgroundColor: hexToRGBA("#BA390F", 0.8),
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            marginHorizontal: 8
                            }}>
                            <Text
                            style={{
                                color: kauriColors.primary.light,
                                ...designSystem.textStyles.smallTexts,
                            }}>
                            {geti18n('common.theory')}
                            </Text>
                        </View>
                        <Text style={{...designSystem.textStyles.smallTexts, color: hexToRGBA("#34291D", 0.7)}}>
                            19-Mar-2023
                        </Text>
                    </View>
                    
                    <Text style={{...designSystem.textStyles.paragraph, marginTop: 24, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                        <Text style={{...designSystem.textStyles.titleSans, fontSize: 32, color: kauriColors.primary.dark}}>{hexIntro.content[0]}</Text>{hexIntro.content.substring(1)}
                    </Text>
                </View>
                {
                    ["Empowering and uplifting communities",
                     "Stable climate and clean climate ",
                     "Health and mental wellbeing",
                     "Protecting biodiversity and ethical treatment of animals",
                     "Clean and responsible energy usage"
                    ].map((item, dimIndex) => {
                        return (
                            <View style={{marginTop: 24 }} key={dimIndex}>
                                <View style={{borderTopColor: hexToRGBA(kauriColors.primary.chipBar, 0.5), borderTopWidth: 1.2, marginHorizontal: 32, paddingTop: 16}}>
                                    <Text style={{...designSystem.textStyles.titleSmall, color: kauriColors.primary.dark, }}>
                                    {item}
                                    </Text>
                                </View>
                                <Text style={{paddingHorizontal: 32, paddingTop: 8, ...designSystem.textStyles.captionsBold, color: kauriColors.primary.yellow}}>
                                    See All
                                </Text>
                                <View style={{ width: windowWidth}}>
                                <FlashList
                                    horizontal={true}
                                    estimatedItemSize={windowWidth-64}
                                    data={Array.from({length: 20})}
                                    decelerationRate={0}
                                    snapToInterval={windowWidth -64}
                                    renderItem={({item, index}) => {
                                        return (
                                        <View style={{width: windowWidth-64, paddingVertical: 32, paddingLeft: 32, paddingRight:0, alignItems: 'flex-start'}}>
                                            <TouchableOpacity activeOpacity={0.9} style={{marginBottom: 16, flexDirection: 'row', alignItems: 'center', borderRadius: 8, width: '100%', padding:8}}>
                                                <Hex title="" dimension={`dimension${dimIndex+1}`} size={40}/>
                                                <View style={{marginLeft: 8, width: '80%'}}>
                                                    <Text style={$causesHead}>
                                                        {`subdimension_${index+1}`}
                                                    </Text>
                                                    <Text style={$causesSubtitle} numberOfLines={2}>
                                                        This is a dummy description for this cause this is pretty freaking cool isnt import PropTypes from 'prop-types'
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={0.9} style={{flexDirection: 'row', alignItems: 'center', width: '100%', padding:8, borderRadius: 8}}>
                                                <Hex title="" dimension={`dimension${dimIndex+1}`} size={40}/>
                                                <View style={{paddingHorizontal: 8, width: '80%'}}>
                                                    <Text style={$causesHead}>
                                                        {`subdimension_${index+2}`}
                                                    </Text>
                                                    <Text style={$causesSubtitle} numberOfLines={2}>
                                                        This is a dummy description for this cause this is pretty freaking cool isnt import PropTypes from 'prop-types'
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        )
                                    }}
                                />
                            </View>
                </View>
                        )
                    })
                }

                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 24}}>
                    <View style={{flexBasis: '50%'}}>
                                <TouchableOpacity activeOpacity={0.9}>
                                    <View style={$actionButton}>
                                        <View style={{width: 12, marginRight: 8}}>
                                            <ShareIcon color={kauriColors.primary.unselectedLight}/>
                                        </View>
                                        <Text style={$actionButtonContent}>
                                            {geti18n('common.share')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                    </View>
                </View>
                <View style={{width: '100%', height: 100}}/>
            </ScrollView>}
            <Header title={hexIntro.title} translationY={translationY}/>
            <View style={{ position: 'absolute', top: $containerInsets.paddingTop, right: 16, backgroundColor: hexToRGBA(kauriColors.primary.chipBar, 0.3), padding:6, borderRadius: 24}}>
                    <TouchableOpacity style={{width: 16}} activeOpacity={0.9} onPress={()=>navigation.goBack()}>
                        <CrossIcon color={kauriColors.primary.dark}/>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export {ReadDetail}

const $actionButton:ViewStyle = {
    backgroundColor: kauriColors.primary.light,
    padding:16,
    margin: 16,
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
}

const $actionButtonContent:TextStyle = {
    ...designSystem.textStyles.captionsBold,
    color: kauriColors.primary.unselectedLight
}

const $causesHead:TextStyle = {
    ...designSystem.textStyles.subtitle,
    color: kauriColors.primary.dark
}

const $causesSubtitle:TextStyle = {
    ...designSystem.textStyles.smallTextsSemi,
    color: hexToRGBA(kauriColors.primary.dark, 0.7),
}