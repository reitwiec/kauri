import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import type { CompositeScreenProps } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FC, useEffect, useState } from "react"
import { ScrollView, StatusBar, Text, TextStyle, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native"
import Animated, { useSharedValue } from "react-native-reanimated"
import { hexIntro } from "../../mockdata"
import type { AppStackParamList } from "../../navigators"
import { KauriLogo, ShareIcon } from "../../svgs"
import { designSystem, kauriColors } from "../../theme"
import {translate as geti18n} from '../../i18n';
import { hexToRGBA } from "../../utils/hexToRGBA"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import type { TabStackParamList } from "../Tabs/Tabs"
import { BusyIndicator, CrossBtn } from "../../components"
import { FlashList } from "@shopify/flash-list"
import { Hex } from "../../components/Hex"
import FastImage from "react-native-fast-image"

type ReadDetailProps = CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, 'readDetail'>,
    BottomTabScreenProps<TabStackParamList>
>

const ReadDetail:FC<ReadDetailProps> = ({}) => {
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
    
    return (
        <View style={{backgroundColor: '#000', flex:1}}>
            <StatusBar backgroundColor={"#000"} barStyle="light-content"/>
            {isBusy? 
                <View style={{width: '100%', minHeight: '100%', backgroundColor: '#fff'}}>
                    <BusyIndicator style="light"/>
                </View>:<><ScrollView bounces={false}>
                <Animated.View style={[{ overflow:'hidden' , backgroundColor: kauriColors.primary.light, borderTopLeftRadius:32,marginTop:$containerInsets.paddingTop,
                                        borderTopRightRadius: 32,}]}>
                                    <Animated.View style={[{backgroundColor: hexToRGBA("#25170E", 0.9), zIndex: 2, padding:16, position:'absolute', width:'100%', bottom:0}]}>
                                            <Text style={{...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.chipBar}}>
                                                3 MIN READ
                                            </Text>
                                            <Text style={{...designSystem.textStyles.titleBigger, color: kauriColors.primary.light, width: '70%'}}>
                                                {hexIntro.title}
                                            </Text>
                                    </Animated.View>
                                {/* <View> */}
                                    <Animated.View style={{width: windowWidth, height:4*windowWidth/3}}>
                                        <FastImage
                                            source={hexIntro.url as any}
                                            resizeMode={'cover'}
                                            style={{width: '100%', height:'100%'}}
                                        />
                                    </Animated.View>
                                {/* </View> */}
                </Animated.View>
                <View style={{paddingHorizontal: 32, backgroundColor: '#fff'}}>
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
                    
                    <Text style={{...designSystem.textStyles.paragraph, fontSize: 16, marginTop: 24, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                        <Text style={{...designSystem.textStyles.titleSans, fontSize: 32, color: kauriColors.primary.dark}}>{hexIntro.content[0]}</Text>{hexIntro.content.substring(1)}
                    </Text>
                </View>
                <View style={{backgroundColor: '#fff'}}>

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
                                        <Text style={{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark, }}>
                                        {item}
                                        </Text>
                                    </View>
                                    <Text style={{paddingHorizontal: 32, ...designSystem.textStyles.captionsBold, color: kauriColors.primary.yellow}}>
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
                </View>
                <View style={{backgroundColor: "#fff"}}>
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
                </View>
            </ScrollView>
            <CrossBtn/></>}
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