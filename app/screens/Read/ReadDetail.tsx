import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import type { CompositeScreenProps } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FC, useEffect, useState } from "react"
import { Image, ScrollView, Text, TextStyle, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native"
import Animated, {  } from "react-native-reanimated"
import { hexIntro } from "../../mockdata"
import type { AppStackParamList } from "../../navigators"
import { CrossIcon, KauriLogo, ShareIcon } from "../../svgs"
import { designSystem, kauriColors, kauriTypography } from "../../theme"
import {translate as geti18n} from '../../i18n';
import { hexToRGBA } from "../../utils/hexToRGBA"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import type { TabStackParamList } from "../Tabs/Tabs"
import LinearGradient from "react-native-linear-gradient"
import { BusyIndicator } from "../../components"

type ReadDetailProps = CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, 'readDetail'>,
    BottomTabScreenProps<TabStackParamList>
>

const ReadDetail:FC<ReadDetailProps> = ({navigation, route}) => {
    const {width:windowWidth, height: windowHeight} = useWindowDimensions()
    const [isBusy, setIsBusy] = useState(true)
    const $containerInsets = useSafeAreaInsetsStyle(['top'])
    const backgroundColor = "#F1E1C7"
    useEffect(() => {
      setTimeout(() => {
        setIsBusy(false)
    }, 1200);
    }, [])
    
    return (
        <View style={{backgroundColor: backgroundColor, flex:1}}>
            {isBusy? 
                <View style={{width: windowWidth, minHeight: windowHeight/2}}>
                    <BusyIndicator style="light"/>
                </View>:<ScrollView bounces={false}>
                <Animated.View style={[{ overflow:'hidden' , backgroundColor: kauriColors.primary.light, borderRadius:0,}]}>
                                <Animated.View style={[{backgroundColor: hexToRGBA("#25170E", 0.9), zIndex: 2, padding:16, position:'absolute', width:'100%'}, hexIntro.description?{bottom:0}:{top:0}]}>
                                        <Text style={{...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.chipBar}}>
                                            3 MIN READ
                                        </Text>
                                        <Text style={{...designSystem.textStyles.titleBigger, color: kauriColors.primary.light, width: '70%'}}>
                                            {hexIntro.title}
                                        </Text>
                                        {
                                            hexIntro.description && <Text style={{...designSystem.textStyles.captions, color: kauriColors.primary.chipBar}}>
                                                {hexIntro.description}
                                            </Text>
                                        }
                                </Animated.View>
                                <Animated.View style={{width: windowWidth, height:4*windowWidth/3}}>
                                    <Image
                                        source={hexIntro.url}
                                        style={{width: '100%', height:'100%', resizeMode: 'cover'}}
                                    />
                                    <LinearGradient colors={[hexToRGBA(backgroundColor, 0), hexToRGBA(backgroundColor, 1)]} style={{position: 'absolute', bottom: 0, height: 150, width: '100%'}}/>
                                </Animated.View>
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
                    
                    <Text style={{...designSystem.textStyles.paragraph, color: "#34291D", marginTop: 24, letterSpacing:0.5, fontSize: 14}}>
                        {hexIntro.content}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 24}}>
                    <View style={{flexBasis: '50%'}}>
                                <TouchableOpacity activeOpacity={0.9}>
                                    <View style={$actionButton}>
                                        <View style={{width: 12, marginRight: 8}}>
                                            <ShareIcon color={"#816F61"}/>
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
             <View style={{ position: 'absolute', top: 16, right: 16, backgroundColor: "#D1BEA5", padding:6, borderRadius: 24}}>
                    <TouchableOpacity style={{width: 16}} activeOpacity={0.9} onPress={()=>navigation.goBack()}>
                        <CrossIcon color={"#816F61"}/>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export {ReadDetail}

const $actionButton:ViewStyle = {
    backgroundColor: "#D1BEA5",
    padding:16,
    margin: 16,
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
}

const $actionButtonContent:TextStyle = {
    ...designSystem.textStyles.captionsBold,
    color: "#816F61"
}