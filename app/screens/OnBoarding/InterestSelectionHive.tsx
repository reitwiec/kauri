import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Pressable, StatusBar, Text, TextStyle, TouchableOpacity, useWindowDimensions, View, ViewStyle } from "react-native";
import type { AppStackParamList } from "../../navigators";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import Animated, { Easing, runOnJS, SharedValue, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { TouchableOpacity as RNTouchableOpacity } from "react-native-gesture-handler";
import { useVector } from "react-native-redash";
import { kauriColors } from "../../theme/kauriColors";
import { designSystem } from "../../theme";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { translate as geti18n } from "../../i18n"
import { BackArrow, KauriLogo } from "../../svgs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Hex } from "../../components/Hex";
import { allCauses as MockAllCauses } from "../../mockdata";
import { springConfig } from "../../utils/cardTransitionOptions";
import { Canvas, Fill, Shader, Skia, useClockValue, useComputedValue, vec } from "@shopify/react-native-skia";
import { MotiText } from "moti";
import { dimensionNameMap } from "../../utils/hexDetails";
import { LineSeparator } from "../../components";

const dimensionHexLengths = {
    maxLength: 32,
}
const defaultOptions = {
    size: { length: dimensionHexLengths.maxLength, radius: dimensionHexLengths.maxLength / 4 },
    maxHeight: dimensionHexLengths.maxLength * 2,
    maxWidth: dimensionHexLengths.maxLength * 2 * Math.sqrt(3) / 2,
    gutter: 8,
    numCols: 6,
}


type InterestSelectionHiveProps = NativeStackScreenProps<AppStackParamList, "onboarding_interests_hive">

interface dimensionHexProps {
    save: boolean;
    updateTotalSelected: (reset?: boolean, increment?: boolean) => void
    dimension: string,
    title: string,
}

const _dimensionHex = ({updateTotalSelected, save, dimension, title }: dimensionHexProps) => {

    // const [selected, setSelected] = useState(false)
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
        selected.value = !selected.value
        updateTotalSelected(selected.value)
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
                        <Hex size={dimensionHexLengths.maxLength} title={title} type={"small"} dimension={dimension} titleVisible={false}/>
                    </Animated.View>
                    <Text style={{...designSystem.textStyles.smallTexts, color:hexToRGBA(kauriColors.primary.dark, 1), textAlign: 'center', marginTop: 8, width:'90%'}}>
                        {title}
                    </Text>
            </RNTouchableOpacity>
        </Animated.View>
    )
}

export const InterestSelectionHive: FC<InterestSelectionHiveProps> = observer(function InterestSelectionHive(_props) {
    const userAcknowledgement = useSharedValue(false)
    const [userAck, setUserAck] = useState(false)
    const saveSharedValue = useSharedValue(false)
    const [save, setSave] = useState(false)
    const $containerInsets = useSafeAreaInsetsStyle(["top"])
    const {width: windowWidth, height: windowHeight} = useWindowDimensions()
    const [allCauses, setCauses] = useState({})
    const [switchZIndex, setSwitchZIndex] = useState(false)
    const translate = useVector(0, 0)
    const [currentPage, setCurrentPage] = useState(0)
    const gestureActive = useSharedValue(false)


    useEffect(()=>{
        setTimeout(() => {
            setCauses(MockAllCauses)
        }, 300);
    }, [])

    const navigateNext = () =>{
        // _props.navigation.navigate("tabs", {screen:'home'})
        _props.navigation.reset({
            index: 0,
            routes: [
                {
                    name: "tabs"
                }
            ]
        })
    }

    const saveOut = useAnimatedStyle(() => {
        return {
            opacity: saveSharedValue.value ? withDelay(850, withTiming(0, { duration: 850, easing: Easing.quad }, (_finished) => {
                //navigated to home screen
                console.log("Navigating to home screen")
                runOnJS(navigateNext)()
            })) : 1
        }
    })

    const dissolveStyle = useAnimatedStyle(() => {
        return {
            opacity: userAcknowledgement.value ? withTiming(0, { duration: 500, easing: Easing.ease }, (finished) => {
                if (finished && userAcknowledgement.value) {
                    runOnJS(setSwitchZIndex)(true)
                    runOnJS(setCurrentPage)(1)
                }
            }) : withDelay(200, withTiming(1, { duration: 300, easing: Easing.ease }))
        }
    }, [userAcknowledgement])

    const dissolveStyleReverse = useAnimatedStyle(() => {
        return {
            opacity: saveSharedValue.value ? withTiming(0, { duration: 200, easing: Easing.ease }) : userAcknowledgement.value ? withDelay(200, withTiming(1, { duration: 300, easing: Easing.ease })) : withTiming(0, { duration: 200, easing: Easing.ease })
        }
    }, [saveSharedValue, userAcknowledgement])

    const saveStyle = useAnimatedStyle(() => {
        return {
            opacity: saveSharedValue.value ? withTiming(0, { duration: 200, easing: Easing.ease }) : 1
        }
    }, [saveSharedValue])

    const totalSelected = useSharedValue(0)

    const $nextBtnAnimation = useAnimatedStyle(()=>{
        return {
            opacity: userAck?totalSelected.value < 1?withTiming(0):withTiming(1):withTiming(1),
            transform: [{translateY: !(userAck && totalSelected.value < 1)?withTiming(0):withTiming(-50)}]
        }
    }, [totalSelected])
    const updateTotalSelected = (increment?: boolean) => {
        if (increment) {
            totalSelected.value +=1
        } else {
            if(totalSelected.value === 0){
                return
            }
            totalSelected.value +=1
        }
    }

    const saveAction = () => {
        translate.x.value = withTiming(0, { duration: 600, easing: Easing.ease});
        translate.y.value = withTiming(0, { duration: 600, easing: Easing.ease});
        setSave(true)
    }
    

    const source = Skia.RuntimeEffect.Make(`
    uniform float2 canvasDimensions;
    uniform float clock;

    mat2 Rot(float a)
    {
        float s = sin(a);
        float c = cos(a);
        return mat2(c, -s, s, c);
    }
    
    vec2 hash( vec2 p )
    {
        p = vec2( dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)) );
        return fract(sin(p)*43758.5453);
    }
    
    float noise( in vec2 p )
    {
        vec2 i = floor( p );
        vec2 f = fract( p );
        
        vec2 u = f*f*(3.0-2.0*f);
    
        float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                            dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                       mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                            dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
        return 0.5 + 0.5*n;
    }
    
    
    vec4 main(vec2 xy )
    {
        vec2 uv = xy/canvasDimensions;
        float ratio = canvasDimensions.x / canvasDimensions.y;
    
        vec2 tuv = uv;
        tuv -= .5;
    
        // rotate with Noise
        float degree = noise(vec2(clock*.1, tuv.x*tuv.y));
    
        tuv.y *= 1./ratio;
        tuv *= Rot(radians((degree-.5)*720.+180.));
        tuv.y *= ratio;
    
        
        // Wave warp with sin
        float frequency = 5.;
        float amplitude = 30.;
        float speed = clock * 2.;
        tuv.x += sin(tuv.y*frequency+speed)/amplitude;
           tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);
        
        
        // draw the image
        vec3 colorYellow = vec3(255., 255., 238.)/255.0;
        vec3 colorKauriLight = vec3(246., 246., 242.)/255.0;
        vec3 colorWhite = vec3(255., 255., 255.)/255.0;

        vec3 layer1 = mix(colorYellow, colorKauriLight, smoothstep(-.3, .2, (tuv*Rot(radians(-5.))).x));
        
        vec3 layer2 = mix(colorWhite, colorYellow, smoothstep(-.3, .2, (tuv*Rot(radians(-5.))).x));
        
        vec3 finalComp = mix(layer1, layer2, smoothstep(.5, -.3, tuv.y));
        
        vec3 col = finalComp;
        
        return vec4(col,1.0);
    }
    `)!;
    const canvasDimensions = vec(windowWidth, windowHeight)
    const clock = useClockValue();
    const uniforms = useComputedValue(
        () => ({canvasDimensions, clock: clock.current/200}),
        [clock]
    );
    return (

        <View style={[$container]}>
                <StatusBar barStyle={'dark-content'} />
                {currentPage === 0 && <Animated.View style={[{position: 'absolute', top:0, right:0, bottom:0, left:0, zIndex:10}, dissolveStyle]}>
                        <Canvas style={{ width: windowWidth, height: windowHeight, backgroundColor: '#fff', }}>
                            <Fill>
                                    <Shader uniforms={uniforms} source={source}/>
                            </Fill>
                        </Canvas>
                    </Animated.View>
                }
                    <Animated.ScrollView style={[saveOut,dissolveStyleReverse, { zIndex: switchZIndex ? 11 : 8, width: windowWidth, paddingTop: Number($containerInsets.paddingTop)+16 }]}>
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
                                                        <_dimensionHex key={i} updateTotalSelected={updateTotalSelected} save={save} dimension={dimension} title={cause}/> 
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
                    </Animated.ScrollView>
                <Animated.View style={[{ width: 24, position: 'absolute', top: 0, left: 16, zIndex: 12 }, $containerInsets, dissolveStyleReverse]}>
                    <Pressable onPress={() => {
                        userAcknowledgement.value = false;
                        setUserAck(false);
                        setSwitchZIndex(false)
                        setCurrentPage(0)
                    }}>
                        <BackArrow color={kauriColors.primary.dark} alt={false}/>
                    </Pressable>
                </Animated.View>

                
                
                {currentPage === 0 && <Animated.View style={[$msgScreen, dissolveStyle]}>
                    <View style={{height: 32, position: 'absolute', top:Number($containerInsets.paddingTop) + 16}}>
                        <KauriLogo/>
                    </View>
                    <MotiText style={$questionTitle} from={{ translateY: 100, opacity: 0 }} animate={{ translateY: 0, opacity: 1 }} transition={{type: 'timing', duration: 800, easing: Easing.inOut(Easing.ease)}}>
                        {geti18n("interestHive.title")}
                    </MotiText>
                    <MotiText style={$questionDescription} from={{ translateY: 100, opacity: 0 }} animate={{ translateY: 0, opacity: 1 }} transition={{type: 'timing',delay:200, duration: 800, easing: Easing.inOut(Easing.ease)}}>
                        {geti18n("interestHive.description")}
                    </MotiText>

                </Animated.View>}
                <Animated.View style={[{ position: 'absolute', bottom: 48, zIndex: 14, }, saveStyle, $nextBtnAnimation]}>

                    <TouchableOpacity onPress={() => {
                        if (userAck) {
                            saveAction()
                            saveSharedValue.value = true;
                            return
                        } 
                        userAcknowledgement.value = true; 
                        setUserAck(true); 
                    }} disabled={userAck && totalSelected.value < 1} activeOpacity={0.9}>
                        <View style={[
                                        {
                                            paddingHorizontal: 72,
                                            paddingVertical: 16,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            marginVertical: 8,
                                            flexDirection: "row",
                                            justifyContent: 'space-evenly',
                                            backgroundColor: kauriColors.primary.yellow,
                                        }]}>
                            <Text style={[designSystem.textStyles.captionsBold, { color: "#fff", opacity: userAck && totalSelected.value < 1 ? 0.7 : 1 }]}>
                                {geti18n("common.next")}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
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
    // justifyContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop:16
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
    // backgroundColor: '#fff',
    zIndex: 10, position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'
}