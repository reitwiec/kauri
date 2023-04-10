import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { BusyIndicator, CrossBtn } from "../../components";
import type { AppStackParamList } from "../../navigators";
import type { TabStackParamList } from "../Tabs/Tabs";
import {ScrollView, StatusBar, Text, TextStyle, useWindowDimensions, View, ViewStyle} from 'react-native'
import { KauriLogo, ShareIcon, Treering } from "../../svgs";
import { designSystem, kauriColors } from "../../theme";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { shadowGenerator } from "../../utils/shadowGenerator";
import {translate as geti18n} from '../../i18n';
import { Canvas, DiscretePathEffect, Extrapolate, Fill, Group, interpolate, LinearGradient, Path, processTransform2d, RadialGradient, Shader, Skia, SweepGradient, useClockValue, useComputedValue, vec } from "@shopify/react-native-skia";
import { dimensionColorMap, dimensionColorMapContrast } from "../../utils/hexDetails";

type TrailProps = CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, 'trail'>,
    BottomTabScreenProps<TabStackParamList>
>
export const Trail:FC<TrailProps> = observer(function Trail(_props){
    const [cumulativeSeconds, setCumulativeSeconds] = useState<number[]>([])
    const [selectedColor, setSelectedColor] = useState("rgb(240,115,116)")
    const total = 250
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
      const impacts = [5]
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

    const c = vec(318 / 2, 480 / 3);
    const C = 0.55228474983079

    const path = useComputedValue(() => {
        const p = Skia.Path.Make();
        const r = 100
        p.moveTo(c.x, c.y - r);
        p.cubicTo(c.x + C* r, c.y - r, c.x + r, c.y - r*C, c.x + r, c.y);
        p.cubicTo(c.x + r, c.y +r*C, c.x + r*C, c.y + r, c.x, c.y + r);
        p.cubicTo(c.x - r*C, c.y + r, c.x - r, c.y + r*C, c.x - r, c.y);
        p.cubicTo(c.x - r, c.y - r*C, c.x - r*C, c.y - r, c.x, c.y - r);
        const m = Skia.Matrix();
        m.translate(c.x, c.y);
        m.translate(-c.x, -c.y);
        p.transform(m);
        return p;
      }, []);


    const maxRings = 85
    const maxScale = 1.25
    return (
        <>
            <StatusBar backgroundColor={"#222222"} barStyle="light-content"/>
                {isBusy? 
                <View style={{width: "100%", height: "100%", backgroundColor:"#222222"}}>
                    <BusyIndicator style="dark"/>
                </View>:
                    <>
                        <ScrollView style={{backgroundColor: "#222222",}} bounces={false}>
                            <View style={{paddingTop: $containerInsets.paddingTop, justifyContent: 'center', alignItems: 'center'}}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <Canvas style={{width: 318, height: 480, backgroundColor: '#FFFDEC', overflow: 'hidden', borderRadius: 12}}>
                                            <Group>
                                                {Array.from({length: total}).map((i, j)=>{
                                                                let strokeWidth = 0.6
                                                                const scale = interpolate(cumulativeSeconds[j]!, [0, cumulativeSeconds[total-1]!], [0, maxScale], Extrapolate.CLAMP)
                                                                const dimensions = ["dimension1", "dimension2", "dimension3", "dimension4", "dimension5"]
                                                                const selectedDimension = dimensions[Math.floor(Math.random() * dimensions.length)]
                                                                return (
                                                                    <Path path={path} style={'stroke'} color={dimensionColorMapContrast()[selectedDimension!]} strokeWidth={strokeWidth} matrix={processTransform2d([{ scale: scale }])} origin={{x: c.x, y: c.y}}>
                                                                            <DiscretePathEffect length={7} deviation={2} seed={10}/>
                                                                    </Path>
                                                                )
                                                            })}
                                            </Group>
                                            {/* <Group>
                                                {Array.from({length: maxRings}).map((i, j)=>{
                                                                const invertedIndex = maxRings-j-1
                                                                let strokeWidth = 1
                                                                const scale = interpolate(invertedIndex===maxRings-1?invertedIndex-1:invertedIndex, [0, maxRings], [0, 28*maxScale/28], Extrapolate.CLAMP)
                                                                const dimensions = ["dimension5"]
                                                                const selectedDimension = dimensions[Math.floor(Math.random() * dimensions.length)]
                                                                return (
                                                                    <Path path={path} style={invertedIndex===maxRings-1?'fill':'stroke'} color={invertedIndex===maxRings-1?'#FFFDEC':kauriColors.primary.chipBar} strokeWidth={strokeWidth} matrix={processTransform2d([{ scale: scale }])} origin={{x: c.x, y: c.y}}>
                                                                            <DiscretePathEffect length={7} deviation={2} seed={1}/>
                                                                    </Path>
                                                                )
                                                            })}
                                            </Group> */}
                                            {/* <Group>
                                                {Array.from({length: maxRings}).map((i, j)=>{
                                                                const invertedIndex = maxRings-j-1
                                                                let strokeWidth = 1
                                                                const scale = interpolate(invertedIndex===maxRings-1?invertedIndex-1:invertedIndex, [0, maxRings], [0, 24*maxScale/28], Extrapolate.CLAMP)
                                                                const dimensions = ["dimension4"]
                                                                const selectedDimension = dimensions[Math.floor(Math.random() * dimensions.length)]
                                                                return (
                                                                    <Path path={path} style={invertedIndex===maxRings-1?'fill':'stroke'} color={invertedIndex===maxRings-1?'#FFFDEC':dimensionColorMapContrast()[selectedDimension!]} strokeWidth={strokeWidth} matrix={processTransform2d([{ scale: scale }])} origin={{x: c.x, y: c.y}}>
                                                                            <DiscretePathEffect length={7} deviation={2} seed={1}/>
                                                                    </Path>
                                                                )
                                                            })}
                                            </Group> */}
                                            {/* <Group>
                                                {Array.from({length: maxRings}).map((i, j)=>{
                                                                const invertedIndex = maxRings-j-1
                                                                let strokeWidth = 1
                                                                const scale = interpolate(invertedIndex===maxRings-1?invertedIndex-1:invertedIndex, [0, maxRings], [0, 22*maxScale/28], Extrapolate.CLAMP)
                                                                const dimensions = ["dimension3"]
                                                                const selectedDimension = dimensions[Math.floor(Math.random() * dimensions.length)]
                                                                return (
                                                                    <Path path={path} style={invertedIndex===maxRings-1?'fill':'stroke'} color={invertedIndex===maxRings-1?'#FFFDEC':dimensionColorMapContrast()[selectedDimension!]} strokeWidth={strokeWidth} matrix={processTransform2d([{ scale: scale }])} origin={{x: c.x, y: c.y}}>
                                                                            <DiscretePathEffect length={7} deviation={2} seed={1}/>
                                                                    </Path>
                                                                )
                                                            })}
                                            </Group> */}
                                            {/* <Group>
                                                {Array.from({length: maxRings}).map((i, j)=>{
                                                                const invertedIndex = maxRings-j-1
                                                                let strokeWidth = 1
                                                                const scale = interpolate(invertedIndex===maxRings-1?invertedIndex-1:invertedIndex, [0, maxRings], [0, 16*maxScale/28], Extrapolate.CLAMP)
                                                                const dimensions = ["dimension2"]
                                                                const selectedDimension = dimensions[Math.floor(Math.random() * dimensions.length)]
                                                                return (
                                                                    <Path path={path} style={invertedIndex===maxRings-1?'fill':'stroke'} color={invertedIndex===maxRings-1?'#FFFDEC':dimensionColorMapContrast()[selectedDimension!]} strokeWidth={strokeWidth} matrix={processTransform2d([{ scale: scale }])} origin={{x: c.x, y: c.y}}>
                                                                            <DiscretePathEffect length={7} deviation={2} seed={1}/>
                                                                    </Path>
                                                                )
                                                            })}
                                            </Group> */}
                                            {/* <Group>
                                                {Array.from({length: maxRings}).map((i, j)=>{
                                                                const invertedIndex = maxRings-j-1
                                                                let strokeWidth = 1
                                                                const scale = interpolate(invertedIndex===maxRings-1?invertedIndex-1:invertedIndex, [0, maxRings], [0, 10*maxScale/28], Extrapolate.CLAMP)
                                                                const dimensions = ["dimension1"]
                                                                const selectedDimension = dimensions[Math.floor(Math.random() * dimensions.length)]
                                                                return (
                                                                    <Path path={path} style={invertedIndex===maxRings-1?'fill':'stroke'} color={invertedIndex===maxRings-1?'#FFFDEC':dimensionColorMapContrast()[selectedDimension!]} strokeWidth={strokeWidth} matrix={processTransform2d([{ scale: scale }])} origin={{x: c.x, y: c.y}}>
                                                                            <DiscretePathEffect length={7} deviation={2} seed={1}/>
                                                                    </Path>
                                                                )
                                                            })}
                                            </Group> */}
                                        </Canvas>
                                </ScrollView>
                                {/* <View style={{width: windowWidth-16, padding: 16, backgroundColor: "#FFFDEC", borderRadius: 12, marginTop: 24, ...shadowGenerator(10)}}>
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
                                </View> */}
                                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 24}}>
                                    <View style={{borderColor: "#FFF", borderWidth:3, width: 16, height: 16, marginHorizontal: 8, borderRadius: 16}}/>
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
                        </ScrollView>
                        <CrossBtn/>
                    </>
                }
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