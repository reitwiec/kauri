import { observer } from "mobx-react-lite";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StatusBar, Text, TextStyle, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native";
import type { AppStackParamList } from "../../navigators";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import Animated, { Easing, runOnJS, SharedValue, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { TouchableOpacity as RNTouchableOpacity } from "react-native-gesture-handler";
import { opacity, useVector } from "react-native-redash";
import { kauriColors } from "../../theme/kauriColors";
import { designSystem } from "../../theme";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { translate as geti18n } from "../../i18n"
import { BackArrow, CrossIcon, KauriLogo, TickIcon } from "../../svgs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Hex } from "../../components/Hex";
import { allCauses as MockAllCauses } from "../../mockdata";
import { springConfig } from "../../utils/cardTransitionOptions";
import { Canvas, Fill, Shader, Skia, useClockValue, useComputedValue, vec } from "@shopify/react-native-skia";
import { MotiProps, MotiScrollView, MotiText, MotiTransitionProp, MotiView } from "moti";
import { dimensionNameMap } from "../../utils/hexDetails";
import { ContributionBar, LineSeparator } from "../../components";
import { hex } from "../../utils/hexGenerator";

const dimensionHexLengths = {
    maxLength: 32,
}


type InterestSelectionHiveProps = NativeStackScreenProps<AppStackParamList, "onboarding_interests_hive">

interface dimensionHexProps {
    save: boolean;
    updateTotalSelected: (dimension: string, increment: boolean) => void
    dimension: string,
    title: string,
    svgFeatures: {
        height: number;
        width: number;
        viewBox: string;
        path: string;
        circumference: number;
    }
}

const _dimensionHex = memo(({updateTotalSelected, save, dimension, title, svgFeatures }: dimensionHexProps) => {

    const selected = useSharedValue(false)

    const hexEffects = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: selected.value ? withSpring(1, springConfig) : withSpring(0.9, springConfig)
            }],
            opacity: selected.value ? withTiming(1, { duration: 200, easing: Easing.ease }) : withTiming(0.5, { duration: 100, easing: Easing.ease })
        }
    },[selected])

    const click = () => {
        const newValue = !selected.value
        selected.value = newValue
        updateTotalSelected(dimension, newValue)
    }

    const fadeOut = useAnimatedStyle(() => {
        const dur = { duration: 700, easing: Easing.ease }
        return {
            opacity: save ? selected.value ? 1 : withTiming(0, dur) : 1,
            transform: [
                { scale: save ? selected.value ? 1 : withSpring(0.7, springConfig) : 1, }
            ]
        }
    }, [save])
    

    return (
        <Animated.View style={[fadeOut]}>
            <RNTouchableOpacity style={[{width:115, height:115, alignItems: 'center'}]} onPress={click} activeOpacity={0.9}>
                    <Animated.View style={[hexEffects]} >
                        <Hex size={dimensionHexLengths.maxLength} title={title} type={"small"} dimension={dimension} titleVisible={false} svgFeatures={svgFeatures}/>
                    </Animated.View>
                    <Text style={{...designSystem.textStyles.smallTexts, color:hexToRGBA(kauriColors.primary.dark, 1), textAlign: 'center', marginTop: 8, width:'90%'}}>
                        {title}
                    </Text>
            </RNTouchableOpacity>
        </Animated.View>
    )
})

export const InterestSelectionHive: FC<InterestSelectionHiveProps> = observer(function InterestSelectionHive(_props) {
    // const userAcknowledgement = useSharedValue(false)
    const mockPeopleContribution = [
        "326 people contributed to Empowering and uplifting communities yesterday on Kauri",
        "178 people contributed to Clean and responsible energy usage yesterday on Kauri",
        "567 people contributed to Protecting biodiversity and ethical treatment of animals yesterday on Kauri",
        "765 people contributed to Stable climate and clean climate yesterday on Kauri",
        "427 people contributed to Health and mental wellbeing yesterday on Kauri"
    ]

    const [peopleMessage, _] = useState(mockPeopleContribution[Math.floor(Math.random() * mockPeopleContribution.length)])
    const [userAcknowledgement, setUserAcknowledgement] = useState(false)
    const [save, setSave] = useState(false)
    const $containerInsets = useSafeAreaInsetsStyle(["top"])
    const {width: windowWidth, height: windowHeight} = useWindowDimensions()
    const [allCauses, setCauses] = useState({})
    const [switchZIndex, setSwitchZIndex] = useState(false)
    const [setupPart1Complete, setSetupPart1Complete] = useState(false)
    const [setupPart2Complete, setSetupPart2Complete] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [contributionsPerDimension, setContributionPerDimension] = useState({"dimension1": 0,
    "dimension2": 0,
    "dimension3": 0,
    "dimension4": 0,
    "dimension5": 0,
},)


    useEffect(()=>{
        setTimeout(() => {
            setCauses(MockAllCauses)
        }, 300);
    }, [])

    
    const navigateNext = () =>{
        _props.navigation.reset({
            index: 0,
            routes: [
                {
                    name: "tabs"
                }
            ]
        })
    }

    const goToStep1 = () => {
        setUserAcknowledgement(false)
        setCurrentPage(0)
        setSwitchZIndex(false)
    }

    const goToStep2 = () => {
        setCurrentPage(1)
        setUserAcknowledgement(true)
        setSwitchZIndex(true)
    }

    const goToStep3 = () => {
        setCurrentPage(2)
        setTimeout(()=>{
            setSetupPart1Complete(true)
        }, 3000)
        setTimeout(()=>{
            setSetupPart2Complete(true)
        }, 5000)
    }
    const saveAction = () => {
        setSave(true)
    }


    const saveOut = useAnimatedStyle(() => {
        return {
            opacity: save ? withDelay(850, withTiming(0, { duration: 450, easing: Easing.out(Easing.ease) }, (_finished) => {
                runOnJS(goToStep3)()
            })) : 1
        }
    }, [save])

    const svgFeatures = useMemo(() => {return hex(dimensionHexLengths.maxLength, dimensionHexLengths.maxLength/4)},[dimensionHexLengths.maxLength])

    const [totalSelected, setTotalSelected] = useState(0)

    const updateTotalSelected = (dimension: string, increment: boolean) => {
        if (increment) {
            const previous = contributionsPerDimension[dimension]
            setContributionPerDimension({...contributionsPerDimension, [dimension]: previous + 1})
            setTotalSelected(prev => prev + 1)
        } else {
            if(totalSelected === 0){
                return
            }
            const previous = contributionsPerDimension[dimension]
            if(previous === 0){
                return
            }
            setContributionPerDimension({...contributionsPerDimension, [dimension]: previous - 1})
            setTotalSelected(prev => prev - 1)
        }
    }

    

    return (

        <View style={[$container]}>
                <StatusBar barStyle={'dark-content'} />
                    {currentPage<2 &&<MotiScrollView from={{opacity:0}} animate={{opacity: 1}}  style={[saveOut, { zIndex: switchZIndex ? 11 : 8, width: windowWidth, paddingTop: Number($containerInsets.paddingTop)+16 }]} exit={{opacity: 0 }}>
                        <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16}}>
                            <Text style={{...designSystem.textStyles.smallTextsBold, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                                SELECT THE CAUSES THAT INTEREST YOU
                            </Text>
                        </View>
                        <View>
                           {
                               Object.keys(allCauses).map((dimension, index)=> {
                                return (
                                    <View key={`${dimension}_${index}`}>
                                        <View style={{marginTop:index===0?24:0, width: '90%', paddingHorizontal: 16}}>
                                            <Text style={{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}}>
                                                {dimensionNameMap(dimension)}
                                            </Text>
                                        </View>
                                        <View style={[$rowContainer, {paddingHorizontal: 16}]}>
                                            {
                                                allCauses[dimension].causes.map(((cause, i) => {
                                                    return (
                                                        <_dimensionHex key={i} updateTotalSelected={updateTotalSelected} save={save} dimension={dimension} title={cause} svgFeatures={svgFeatures}/> 
                                                    )
                                                }))
                                            }
                                        </View>
                                        {index < Object.keys(allCauses).length -1 && <LineSeparator/>}
                                    </View>
                                )
                               })
                           } 
                        </View>
                        <View style={{width: '100%', height:200}}/>
                    </MotiScrollView>}
                    {currentPage === 1 && <MotiView style={[{ width: 24, position: 'absolute', top: 0, left: 16, zIndex: 12 }, $containerInsets]} from={{opacity:0}} animate={{opacity: 1}} exit={{opacity: 0 }}>
                        <Pressable onPress={() => {
                            goToStep1()
                        }}>
                            <BackArrow color={kauriColors.primary.dark} alt={false}/>
                        </Pressable>
                    </MotiView>}

                
                
                    {currentPage === 0 && <View style={[$msgScreen]} >
                        <MotiView from={{opacity: 0 }} animate={{opacity: 1 }} exit={{opacity: 0 }} transition={{type: 'timing', duration: 800, easing: Easing.inOut(Easing.ease)}} style={{height: 32, position: 'absolute', top:Number($containerInsets.paddingTop) + 16}}>
                            <KauriLogo/>
                        </MotiView>
                        <MotiText style={$questionTitle} from={{opacity: 0 }} animate={{opacity: 1 }} exit={{opacity: 0 }} transition={{type: 'timing', duration: 800, easing: Easing.inOut(Easing.ease)}}>
                            {geti18n("interestHive.title")}
                        </MotiText>
                        <MotiText style={$questionDescription} from={{ opacity: 0 }} animate={{opacity: 1 }} exit={{opacity: 0 }} transition={{type: 'timing', duration: 900, easing: Easing.inOut(Easing.ease)}}>
                            {geti18n("interestHive.description")}
                        </MotiText>

                    </View>}
                    {currentPage ===1 && totalSelected>0 && <MotiView from={{opacity: 0 }} animate={{opacity: 1 }}  transition={{type: 'timing', duration: 400, easing: Easing.inOut(Easing.ease)}} style={{position: 'absolute', top:0, width: windowWidth, backgroundColor: "#fff", paddingVertical: 16,paddingHorizontal:24, alignItems: 'center',justifyContent: 'center', zIndex: 11, paddingTop: Number($containerInsets.paddingTop)+8}}>
                            <Text style={{color: kauriColors.primary.dark, ...designSystem.textStyles.smallTexts}}>
                                Selected {totalSelected}/{55} cause(s)
                            </Text>
                            <View style={{marginTop: 8, width:'100%'}} >
                                <ContributionBar contributions={contributionsPerDimension} totalContributions={totalSelected}/>
                            </View>
                        </MotiView>
                    }
                    {!(userAcknowledgement && totalSelected < 1) && currentPage<2 && <MotiView from={{opacity: 0 }} animate={{opacity: 1 }} transition={{type: 'timing', duration: 400, easing: Easing.inOut(Easing.ease)}} style={[{ position: 'absolute', bottom: 48, zIndex: 14, right:24 }, saveOut]}>

                        <TouchableOpacity onPress={() => {
                            if (userAcknowledgement) {
                                saveAction()
                                // saveSharedValue.value = true;
                                return
                            } 
                            goToStep2()
                        }} disabled={userAcknowledgement && totalSelected < 1} activeOpacity={0.9} style={[
                            {
                                width: 64,
                                height: 64,
                                borderRadius: 50,
                                alignItems: 'center',
                                marginVertical: 8,
                                flexDirection: "row",
                                justifyContent: 'space-evenly',
                                backgroundColor: kauriColors.primary.yellow,
                            }]}>
                                {/* <Text style={[designSystem.textStyles.captionsBold, { color: "#fff", opacity: userAcknowledgement && totalSelected < 1?0.7:1 }]}>
                                    {geti18n("common.next")}
                                </Text> */}
                                <View style={{width: 24, transform: [{rotate: '180deg'}]}}>

                                    <BackArrow color={"#fff"} alt={false}/>
                                </View>
                        </TouchableOpacity>
                    </MotiView>}
                    {currentPage ===2 && <ScrollView bounces={false} contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start', flex:1}}>
                                <MotiView from={{opacity: 0 }} animate={{opacity: 1 }} transition={{type: 'timing', duration: 800, easing: Easing.inOut(Easing.ease)}} style={{height: 200, width: windowWidth,justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{height: 32, width: 104}}>
                                        <KauriLogo/>
                                    </View>
                                </MotiView>
                                <MotiView style={{width: windowWidth}} from={{opacity: 0 }} animate={{opacity: 1 }} transition={{type: 'timing', duration: 800, easing: Easing.inOut(Easing.ease)}}>
                                    <Text style={[$questionTitle, {paddingHorizontal: 24}]}>
                                        {"We need a few seconds to prepare Kauri for you..."}
                                    </Text>
                                    <Text style={{...designSystem.textStyles.smallTextsBold, paddingHorizontal: 24, marginVertical: 16, color: hexToRGBA(kauriColors.primary.dark, 0.6)}}>
                                        Let's take a deep breath and work through this together. <Text style={{color: kauriColors.primary.yellow}}>{peopleMessage}</Text>
                                    </Text>
                                </MotiView>
                                <MotiView style={{marginTop: 24}} from={{opacity: 0 }} animate={{opacity: 1 }} transition={{type: 'timing', duration: 800, easing: Easing.inOut(Easing.ease)}}>
                                    <View>
                                        <View style={[designSystem.card, {flexDirection: 'row', alignItems: 'center', padding:16}]}>
                                            <Text style={{flexBasis: '80%', ...designSystem.textStyles.captionsMediumBold, color: kauriColors.primary.dark}}>
                                                Building a personlised roadmap to help you on your sustainable journey
                                            </Text>
                                            <View style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                                                {!setupPart1Complete&& <MotiView from={{transform: [{scale: 1}], opacity:0}} animate={{transform: [{scale: 1.1}], opacity:1,}} exit={{opacity:0}} transition={{type:'timing', duration: 1200, loop:true}} style={[{ borderColor: kauriColors.primary.yellow, borderRadius: 10, borderWidth:2, width:20, height:20}]}/>}
                                                {setupPart1Complete && <MotiView style={{width:24}} from={{opacity: 0 }} animate={{opacity: 1 }} transition={{type: 'timing', duration: 800, easing: Easing.inOut(Easing.ease)}}><TickIcon color={kauriColors.primary.yellow}/></MotiView>}
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[{ marginTop:16}]}>
                                        <View style={[designSystem.card, {flexDirection: 'row', alignItems: 'center', padding:16}]}>
                                            <Text style={{flexBasis: '80%', ...designSystem.textStyles.captionsMediumBold, color: kauriColors.primary.dark}}>
                                                Setting up a fully transparent shop
                                            </Text>
                                            <View style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                                                {!setupPart2Complete && <MotiView from={{transform: [{scale: 1}], opacity:0}} animate={{transform: [{scale: 1.1}], opacity:1,}} exit={{opacity: 0}} transition={{type:'timing', duration: 1200, loop:true}} style={[{ borderColor: kauriColors.primary.yellow, borderRadius: 10, borderWidth:2, width:20, height:20}]}/>}
                                                {setupPart2Complete && <MotiView style={{width:24}} from={{opacity: 0 }} animate={{opacity: 1 }} transition={{type: 'timing', duration: 800, easing: Easing.inOut(Easing.ease)}}><TickIcon color={kauriColors.primary.yellow}/></MotiView>}
                                            </View>
                                        </View>
                                    </View>
                                </MotiView>
                                {setupPart1Complete && setupPart2Complete && 
                                    <TouchableOpacity activeOpacity={0.9} onPress={navigateNext}>
                                        <MotiView from={{opacity: 0 }} animate={{opacity: 1 }} transition={{type: 'timing', duration: 800, easing: Easing.inOut(Easing.ease)}} style={{padding: 16, backgroundColor: kauriColors.primary.dark, borderRadius: 50, marginTop:64}}>
                                        <Text style={{color: "#fff", ...designSystem.textStyles.smallTextsBold}}>
                                            Complete Setup
                                        </Text>
                                        </MotiView>
                                    </TouchableOpacity>
                                }
                        </ScrollView>
                    }
            </View>

    )
})


const $container: ViewStyle = {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
}

const $rowContainer: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop:16,
}

const $row: ViewStyle = {
    flexDirection: "row",
    justifyContent: 'space-around',
}

const $questionTitle: TextStyle = {
    ...designSystem.textStyles.superTitleSans,
    color: kauriColors.primary.dark,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 32
}

const $questionDescription: TextStyle = {
    ...designSystem.textStyles.captionsMediumBold,
    color: kauriColors.primary.dark,
    textAlign: 'left',
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 32,
    marginBottom: 24
}

const $msgScreen: ViewStyle = {
    backgroundColor: '#fff',
    zIndex: 10, position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'
}