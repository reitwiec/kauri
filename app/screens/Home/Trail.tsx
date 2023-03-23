import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { BusyIndicator } from "../../components";
import type { AppStackParamList } from "../../navigators";
import type { TabStackParamList } from "../Tabs/Tabs";
import {Image, ScrollView, StatusBar, Text, TextStyle, useWindowDimensions, View, ViewStyle} from 'react-native'
import { CrossIcon, KauriLogo, ShareIcon, Treering } from "../../svgs";
import { designSystem, kauriColors } from "../../theme";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { dimensionColorMap } from "../../utils/hexDetails";
import { shadowGenerator } from "../../utils/shadowGenerator";
import { hexToRGBA } from "../../utils/hexToRGBA";
import {translate as geti18n} from '../../i18n';

type TrailProps = CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, 'trail'>,
    BottomTabScreenProps<TabStackParamList>
>
export const Trail:FC<TrailProps> = observer(function Trail(_props){
    const [cumulativeSeconds, setCumulativeSeconds] = useState<number[]>([])
    const [selectedColor, setSelectedColor] = useState("rgb(240,115,116)")
    const total = 500
    const $containerInsets = useSafeAreaInsetsStyle(['top'])
    const {width: windowWidth, height: windowHeight} = useWindowDimensions()
    const [isBusy, setIsBusy] = useState(true)

    const getCurrentDate=():string=>{
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
   
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return date + '-' + months[month-1] + '-' + year;//format: d-m-y;
  }

    useEffect(() => {
      let totalSeconds = 0
      const impacts = [0.1, 0.5, 1]
      const cumulativeSeconds:number[] = []
      Array.from({length: total}).forEach((i, j) => {
        const second = impacts[Math.floor(Math.random() * impacts.length)]!*20
        totalSeconds += second 
        cumulativeSeconds.push(totalSeconds)
      })
      setCumulativeSeconds(cumulativeSeconds)
      setTimeout(() => {
          setIsBusy(false)
      }, 1200);
    }, [])

    return (
        <>
            <StatusBar backgroundColor={"#222222"} barStyle="light-content"/>
            <ScrollView style={{backgroundColor: "#222222",}} bounces={false}>
                {isBusy? 
                <View style={{width: windowWidth, minHeight: windowHeight/2}}>
                    <BusyIndicator style="dark"/>
                </View>:
                
                <View style={{paddingTop: $containerInsets.paddingTop, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width: windowWidth-32, padding: 16, backgroundColor: "#FFFDEC", borderRadius: 12, marginTop: 24, ...shadowGenerator(10)}}>
                        <Treering cumulativeSeconds={cumulativeSeconds} total={total}/>
                        <View>
                            <Text style={{...designSystem.textStyles.superTitle, color: selectedColor}}>
                                Reitwiec
                            </Text>
                            <Text style={{...designSystem.textStyles.captionsExtraBold, color: selectedColor, letterSpacing: 3}}>
                                {`${total} ${geti18n('common.rings').toUpperCase()}`}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'row', marginTop: 75, flexBasis: '50%', alignItems: 'flex-end'}}>
                                <View style={{borderColor: selectedColor,
                                        borderLeftWidth: 2,
                                        borderRightWidth: 0,}}>
                                    <Text style={[{color: selectedColor, paddingHorizontal: 4, ...designSystem.textStyles.smallTextsSemi, letterSpacing: 0.75}]}>{geti18n('home.generatedOn')}</Text>
                                    <Text style={[$bottomText, {color: selectedColor}]}>
                                        {getCurrentDate().toUpperCase()} | {geti18n('common.trail').toUpperCase()}
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexBasis: '50%', marginTop: 75, alignItems: 'flex-end',}}>
                                <View style={{width:'50%'}}>
                                    <KauriLogo textColor={selectedColor} flowerColor={selectedColor}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 24}}>
                        <View style={{borderColor: "#FFFDEC", borderWidth:3, width: 16, height: 16, marginHorizontal: 8, borderRadius: 16}}/>
                        <Text style={{color: '#FFFDEC', ...designSystem.textStyles.smallTextsSemi}}>
                            {geti18n('home.ringDescription')}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexBasis: '50%'}}>
                            <TouchableOpacity activeOpacity={0.9}>
                                <View style={$actionButton}>
                                    <Text style={$actionButtonContent}>
                                        {geti18n('common.save')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexBasis: '50%'}}>
                            <TouchableOpacity activeOpacity={0.9}>
                                <View style={$actionButton}>
                                    <View style={{width: 12, marginRight: 8}}>
                                        <ShareIcon color={kauriColors.primary.chipBar}/>
                                    </View>
                                    <Text style={$actionButtonContent}>
                                        {geti18n('common.share')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                }
            </ScrollView>
            <View style={{ position: 'absolute', top: $containerInsets.paddingTop, right: 16, backgroundColor: hexToRGBA(kauriColors.primary.chipBar, 0.3), padding:6, borderRadius: 24}}>
                    <TouchableOpacity style={{width: 16}} activeOpacity={0.9} onPress={()=>_props.navigation.goBack()}>
                        <CrossIcon color={kauriColors.primary.dark}/>
                    </TouchableOpacity>
            </View>
        </>
)})

const $bottomText:TextStyle = {
     paddingHorizontal: 4,
     letterSpacing: 2,
     ...designSystem.textStyles.smallTextsBold
}

const $actionButton:ViewStyle = {
    backgroundColor: kauriColors.primary.dark,
    padding:16,
    margin: 16,
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
}

const $actionButtonContent:TextStyle = {
    ...designSystem.textStyles.captionsBold,
    color: kauriColors.primary.chipBar
}