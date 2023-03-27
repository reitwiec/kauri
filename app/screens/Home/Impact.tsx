import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import type { FC } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { Circle, Defs, Path, Svg, LinearGradient as LinearGradientSvg, Stop, Ellipse} from "react-native-svg";
import { BusyIndicator } from "../../components";
import type { AppStackParamList } from "../../navigators";
import { designSystem, kauriColors } from "../../theme";
import { dimensionColorMap } from "../../utils/hexDetails";
import { hexToRGBA } from "../../utils/hexToRGBA";
import type { TabStackParamList } from "../Tabs/Tabs";
import {translate as geti18n} from '../../i18n';

const $dark70 = hexToRGBA(kauriColors.primary.dark, 0.5)

const ValueContainer = ({value, unit}:{value: string, unit: string}) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'baseline', marginTop: 16}}>
            <Text style={{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}}>
                {value}
            </Text>
            <Text style={{...designSystem.textStyles.captionsBold, marginLeft: 4, color: $dark70}}>
                {unit}
            </Text>
        </View>
    )
}

const BarContainer = ({value, maxValue, label, color}:{value:number, maxValue:number, label:string, color:string,}) => {
    return (
        <View>
            <Text style={{...designSystem.textStyles.smallTextsSemi, color: kauriColors.primary.dark}}>
                {label}
            </Text>
            <View style={{backgroundColor: color, padding:8, borderRadius: 8, marginTop:8, width: `${value * 90/maxValue}%`}}>
                <Text style={{...designSystem.textStyles.smallTexts, color: '#fff'}}>
                    {`${value}%`}
                </Text>
            </View>
        </View>
    )
}


export interface ImpactProps{
    riveHeight: number,
    navigationProps: CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, "home", undefined>, NativeStackNavigationProp<AppStackParamList, "trail", undefined>>,
}

export const Impact:FC<ImpactProps> = observer(function impact({riveHeight, navigationProps}){
    const {width:windowWidth, height: windowHeight} = useWindowDimensions()


    const $dark70 = hexToRGBA(kauriColors.primary.dark, 0.5)

    const ActiveAction = () =>{
        return (
            <View style={{aspectRatio: 32/30}}>
                <Svg width="100%" height="100%" viewBox="0 0 32 30" fill="none">
                    <Circle cx="8" cy="15" r="8" fill="#FF4F56" fillOpacity="0.5"/>
                    <Circle cx="24" cy="15" r="8" fill="#FF4F56" fillOpacity="0.5"/>
                    <Circle cx="12.2" cy="8" r="8" fill="#FF4F56" fillOpacity="0.5"/>
                    <Circle cx="19.8" cy="8" r="8" fill="#FF4F56" fillOpacity="0.5"/>
                    <Circle cx="12" cy="22" r="8" fill="#FF4F56" fillOpacity="0.5"/>
                    <Circle cx="20" cy="22" r="8" fill="#FF4F56" fillOpacity="0.5"/>
                </Svg>
            </View>
        )
    }

    const ActiveShop = () => {
        return (
            <View style={{aspectRatio: 25/30}}>
                <Svg width="100%" height="100%" viewBox="0 0 25 30" fill="none">
                    <Path d="M5 11.0254C5.66667 7.85876 7.7 1.42542 10.5 1.02542C14 0.525423 17 7.52542 17.5 11.0254" stroke="#AE7B50"/>
                    <Path d="M7 11.0254C7.66667 7.85876 9.7 1.42542 12.5 1.02542C16 0.525423 19 7.52542 19.5 11.0254" stroke="#C79A71"/>
                    <Path d="M3.29279 10.5254C2.37506 10.5254 1.57342 11.1481 1.37194 12.0435C0.547859 15.7056 -0.462358 21.4446 0.231239 23.5254C0.764713 25.1258 1.32783 26.6669 1.74267 27.7633C2.0321 28.5282 2.76749 29.0254 3.5853 29.0254H20.6459C21.4637 29.0254 22.1991 28.5282 22.4886 27.7633C22.9034 26.6669 23.4665 25.1258 24 23.5254C24.6936 21.4446 23.6834 15.7056 22.8593 12.0435C22.6578 11.1481 21.8562 10.5254 20.9384 10.5254H3.29279Z" fill="url(#paint0_linear_191_1608)"/>
                    <Defs>
                        <LinearGradientSvg id="paint0_linear_191_1608" x1="17" y1="23.5" x2="3.13173e-07" y2="18.5" gradientUnits="userSpaceOnUse">
                            <Stop stopColor="#C99F75"/>
                            <Stop offset="1" stopColor="#AE7B50"/>
                        </LinearGradientSvg>
                    </Defs>
                </Svg>
            </View>

        )
    }


    const ActiveHome = () => {
        return (<View style={{aspectRatio: 34/30}}>
           <Svg width="100%" height="100%" viewBox="0 0 34 30" fill="none">
                <Ellipse cx="16.5" cy="9.14111" rx="5.5" ry="5" fill="#3A3A3A"/>
                <Path fillRule="evenodd" clipRule="evenodd" d="M16.5 12.1411C14.3333 14.1411 10 19.0411 10 22.6411C10 27.1411 14.1364 29.1411 16.5 29.1411C18.8636 29.1411 23 27.1411 23 22.6411C23 19.0411 18.6667 14.1411 16.5 12.1411Z" fill="#3A3A3A"/>
                <Path d="M10.2294 21.0917C10.4467 20.3038 10.806 19.4861 11.2527 18.6738C12.803 18.4265 15.0279 18.1411 16.7201 18.1411C18.1341 18.1411 20.0687 18.3403 21.6789 18.5502C22.1397 19.3714 22.5138 20.2001 22.7448 20.9996C21.3611 20.7391 18.9626 20.3911 16.7201 20.3911C14.1993 20.3911 11.4815 20.8308 10.2294 21.0917Z" fill="#FBD25D"/>
                <Path d="M10.45 25.047C10.1923 24.4082 10.032 23.6903 10.0044 22.8903C11.3137 22.64 14.4826 22.1411 16.7201 22.1411C18.5519 22.1411 21.2576 22.4755 22.9995 22.7341C22.9889 23.5644 22.8368 24.3084 22.581 24.9693C21.1771 24.7129 18.8765 24.3911 16.7201 24.3911C14.3385 24.3911 11.781 24.7836 10.45 25.047Z" fill="#FBD25D"/>
                <Path d="M21.5727 26.6682C20.1532 28.3577 17.9795 29.1411 16.5001 29.1411C15.0575 29.1411 12.9546 28.3961 11.5347 26.7924C13.0644 26.4779 15.128 26.1411 16.7201 26.1411C18.1031 26.1411 19.9843 26.3953 21.5727 26.6682Z" fill="#FBD25D"/>
                <Path fillRule="evenodd" clipRule="evenodd" d="M16.296 12.8597C15.0389 11.3943 7.77798 13.8575 5.15003 16.318C1.86509 19.3936 0.94371 24.3658 3.8862 24.4785C7.44371 24.6147 8.82725 26.8296 12.1122 23.7541C14.7401 21.2936 17.4437 14.1147 16.296 12.8597Z" fill="#E6E6E6" fillOpacity="0.8"/>
                <Path fillRule="evenodd" clipRule="evenodd" d="M17.2592 12.8597C18.5162 11.3943 25.7772 13.8575 28.4051 16.318C31.6901 19.3936 32.6115 24.3658 29.669 24.4785C26.1115 24.6147 24.7279 26.8296 21.443 23.7541C18.815 21.2936 16.1115 14.1147 17.2592 12.8597Z" fill="#E6E6E6" fillOpacity="0.8"/>
                <Path d="M18 4.64096C18.1667 3.14096 19.4 0.340958 23 1.14096" stroke="#3A3A3A" strokeLinecap="round"/>
                <Path d="M15 4.64096C14.8333 3.14096 13.6 0.340958 10 1.14096" stroke="#3A3A3A" strokeLinecap="round"/>
            </Svg> 
        </View>)
    }
    
    return (
        <View style={{width: "100%", alignItems: 'center'}}>
            {
                false?
                    <BusyIndicator style="light"/>:
                    <View style={{width: '100%', paddingHorizontal: 16}}>

                        <View style={{...designSystem.card, padding:16, marginTop:24,}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <View style={{width: 16}}>
                                    <ActiveHome/>
                                </View>
                                <Text style={{color: kauriColors.primary.yellow, ...designSystem.textStyles.smallTextsBold, marginLeft: 4}}>
                                    {geti18n('common.causes')}
                                </Text>
                            </View>
                            <Text style={{...designSystem.textStyles.captionsBold, color: $dark70, marginTop: 16}}>
                                You're positive impact is in the <Text style={{...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.dark}}>Top 2%</Text> of all the Kauri users.
                            </Text>
                            <ValueContainer value={'Top 2%'} unit={'of all users'}/>
                        </View>
                        <View style={{...designSystem.card, padding:16, marginTop: 24}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <View style={{width: 16}}>
                                    <ActiveAction/>
                                </View>
                                <Text style={{color: '#FF4F56', ...designSystem.textStyles.smallTextsBold, marginLeft: 4}}>
                                    Actions
                                </Text>
                            </View>
                            <ValueContainer value={'108'} unit={'actions completed'}/>
                        </View>
                        
                        <View style={{...designSystem.card, padding:16, marginTop: 24}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <View style={{height: 16}}>
                                    <ActiveHome/>
                                </View>
                                <Text style={{color: kauriColors.primary.yellow, ...designSystem.textStyles.smallTextsBold, marginLeft: 4}}>
                                    Causes
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'baseline', marginTop: 16}}>
                                <Text style={{...designSystem.textStyles.captionsBold, color: $dark70}}>
                                    You have been a champion in contributing towards <Text style={{...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.dark}}>Empowering & uplifting communities</Text> category.
                                </Text>
                            </View>
                            <View>
                                <ValueContainer value="35" unit="%"/>
                                <BarContainer value={35} maxValue={35} label={"Empowering & uplifting communities"} color={dimensionColorMap()['dimension1']}/>
                            </View>
                            <View>
                                <ValueContainer value="23" unit="%"/>
                                <BarContainer value={23} maxValue={35} label={"Stable climate & clean climate"} color={dimensionColorMap()['dimension2']}/>
                            </View>
                            <View>
                                <ValueContainer value="15" unit="%"/>
                                <BarContainer value={15} maxValue={35} label={"Health and mental wellbeing"} color={dimensionColorMap()['dimension3']}/>
                            </View>
                            <View>
                                <ValueContainer value="15" unit="%"/>
                                <BarContainer value={15} maxValue={35} label={"Clean & responsible energy usage"} color={dimensionColorMap()['dimension4']}/>
                            </View>
                            <View>
                                <ValueContainer value="12" unit="%"/>
                                <BarContainer value={15} maxValue={35} label={"Protecting biodiversity & ethical treatment of animals"} color={dimensionColorMap()['dimension5']}/>
                            </View>
                        </View>
                        <View style={{...designSystem.card, padding:16, marginTop: 24}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <View style={{width: 16}}>
                                    <ActiveAction/>
                                </View>
                                <Text style={{color: '#FF4F56', ...designSystem.textStyles.smallTextsBold, marginLeft: 4}}>
                                    Actions
                                </Text>
                            </View>
                            <ValueContainer value="12" unit="habits formed"/>
                        </View>
                        <View style={{...designSystem.card, padding:16, marginTop: 24}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <View style={{width: 16}}>
                                    <ActiveShop/>
                                </View>
                                <Text style={{color: '#B6855B', ...designSystem.textStyles.smallTextsBold, marginLeft: 4}}>
                                    Shop
                                </Text>
                            </View>
                            <ValueContainer value="67" unit="sustainable purchases"/>
                        </View>
                        <View style={{...designSystem.card, padding:16, marginTop: 24}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <View style={{width: 16}}>
                                    <ActiveShop/>
                                </View>
                                <Text style={{color: '#B6855B', ...designSystem.textStyles.smallTextsBold, marginLeft: 4}}>
                                    Shop
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'baseline', marginTop: 16}}>
                                <Text style={{...designSystem.textStyles.captionsBold, color: $dark70}}>
                                    You have bought most sustainable goods from the <Text style={{...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.dark}}>Home Essentials</Text> category.
                                </Text>
                            </View>
                            <View>
                                <ValueContainer value="23" unit="products"/>
                                <BarContainer value={32.8} maxValue={32.8} label={"Home Essentials"} color={kauriColors.primary.yellow}/>
                            </View>
                            <View>
                                <ValueContainer value="19" unit="products"/>
                                <BarContainer value={27.1} maxValue={32.8} label={"Cosmetics"} color={kauriColors.primary.yellow}/>
                            </View>
                            <View>
                                <ValueContainer value="12" unit="products"/>
                                <BarContainer value={17.1} maxValue={32.8} label={"Beauty"} color={kauriColors.primary.yellow}/>
                            </View>
                        </View>
                    </View>
            }
            <View style={{height:riveHeight*1.25, width:windowWidth}}/>
        </View>
    )
})