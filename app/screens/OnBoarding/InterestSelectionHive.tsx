import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Pressable, StatusBar, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import type { AppStackParamList } from "../../navigators";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import Svg, { Path } from 'react-native-svg'
import { hex } from "../../utils/hexGenerator";
import Animated, { Easing, runOnJS, SharedValue, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useVector } from "react-native-redash";
import { createNoise2D } from "simplex-noise";
import { kauriColors } from "../../theme/kauriColors";
import { designSystem } from "../../theme";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { translate as geti18n } from "../../i18n"
import ScrollIndicator from "../../components/ScrollIndicator";
import { BackArrow } from "../../svgs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

const dimensionHexLengths = {
    maxLength: 52,
}
const defaultOptions = {
    size: { length: dimensionHexLengths.maxLength, radius: dimensionHexLengths.maxLength / 4 },
    maxHeight: dimensionHexLengths.maxLength * 2,
    maxWidth: dimensionHexLengths.maxLength * 2 * Math.sqrt(3) / 2,
    gutter: 16,
    numCols: 6,
    fringeWidth: 100,
}

const noise2D = createNoise2D()

// interface InterestSelectionHiveProps extends AppStackScreenProps<"onboarding_interests_hive"> { }
type InterestSelectionHiveProps = NativeStackScreenProps<AppStackParamList, "onboarding_interests_hive">

interface dimensionHexProps {
    path: string;
    width: number;
    height: number;
    viewBox: string;
    backgroundColor: string;
    row: number;
    col: number;
    userAcknowledgement: boolean;
    save: boolean;
    updateTotalSelected: (reset?: boolean, increment?: boolean) => void
    totalSelected: number
    gestureActive: SharedValue<boolean>
}

const _dimensionHex = ({ path, width, height, viewBox, backgroundColor, row, col, userAcknowledgement, updateTotalSelected, gestureActive, save }: dimensionHexProps) => {

    const dx = useSharedValue(0)
    const dy = useSharedValue(0)
    const dScale = useSharedValue(1)
    const [selected, setSelected] = useState(false)
    const [wasSelected, setWasSelected] = useState(false)

    // useEffect(() => {
    //     if (userAcknowledgement) {
    //         if(wasSelected){
    //             setSelected(true)
    //         }else{
    //             setSelected(false)
    //         }
    //         dx.value = 0
    //         dy.value = 0
    //         dScale.value = withSequence(withTiming(0.9, {
    //             duration: 300,
    //             easing: Easing.ease
    //         }), withTiming(1, {
    //             duration: 250,
    //             easing: Easing.ease
    //         }))
    //         dx.value = withRepeat(
    //             withTiming(noise2D(row, col), {
    //                 duration: 750,
    //                 easing: Easing.inOut(Easing.cubic),
    //             }),
    //             -1,
    //             true
    //         )

    //         dy.value = withRepeat(
    //             withTiming(noise2D(row, col), {
    //                 duration: 550,
    //                 easing: Easing.ease,
    //             }),
    //             -1,
    //             true
    //         )
    //     } else {
    //         dx.value = withTiming(0, {duration: 350})
    //         dy.value = withTiming(0, {duration: 350})
    //         if(selected){
    //             setWasSelected(true)
    //         }else{
    //             setWasSelected(false)
    //         }
    //         setSelected(false)
    //         dScale.value = withDelay(300 * row * col, withRepeat(

    //             withTiming(1.15, {
    //                 duration: 800,
    //                 easing: Easing.inOut(Easing.cubic),

    //             }),
    //             -1,
    //             true
    //         ))
    //     }
    // }, [userAcknowledgement])

    const hexEffects = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: userAcknowledgement ? dx.value * 2 : dx.value },
                { translateY: userAcknowledgement ? dy.value * -2 : dy.value },
                // { scale: dScale.value }
            ],
            opacity: selected ? withTiming(1, { duration: 200, easing: Easing.ease }) : withTiming(0.3, { duration: 100, easing: Easing.ease })
        }
    },[selected, dx, dy])

    const click = () => {
        if (gestureActive.value === true) {
            return
        }
        setSelected(prev => !prev)
        updateTotalSelected(false, !selected)
    }

    const fadeOut = useAnimatedStyle(() => {
        return {
            opacity: save ? selected ? 1 : withTiming(0, { duration: 700, easing: Easing.ease }) : 1,
            transform: [
                { scale: save ? selected ? 1 : withTiming(0.7, { duration: 700, easing: Easing.ease }) : 1, }
            ]
        }
    }, [save, selected])

    return (
        <Animated.View style={[fadeOut]}>
            <Pressable style={[{ marginHorizontal: defaultOptions.gutter / 2, width: defaultOptions.maxWidth, height: defaultOptions.maxHeight }]} onPress={click} >
                <Animated.View style={[hexEffects]} >
                    <Svg width={width} height={height} viewBox={viewBox}>
                        <Path
                            d={path}
                            fill={backgroundColor}
                        />
                    </Svg>
                </Animated.View>
            </Pressable>
        </Animated.View>
    )
}

export const InterestSelectionHive: FC<InterestSelectionHiveProps> = observer(function InterestSelectionHive(_props) {
    const userAcknowledgement = useSharedValue(false)
    const [userAck, setUserAck] = useState(false)
    const saveSharedValue = useSharedValue(false)
    const [save, setSave] = useState(false)
    const $containerInsets = useSafeAreaInsetsStyle(["top"], "margin")
    const svgFeatures = hex(defaultOptions.size.length, defaultOptions.size.radius)
    const totalDimensions = 55
    const [switchZIndex, setSwitchZIndex] = useState(false)
    let rows: any = [];
    let colsRemaining = 0;
    let evenRow = true;
    for (let i = 0; i < totalDimensions; i++) {
        if (colsRemaining === 0) {
            colsRemaining = evenRow ? defaultOptions.numCols - 1 : defaultOptions.numCols;
            evenRow = !evenRow;
            rows.push([]);
        }
        rows[rows.length - 1].push(i);
        colsRemaining--;
    }
    const translate = useVector(0, 0)
    const offset = useVector(0, 0)
    const [currentPage, setCurrentPage] = useState(0)
    const previousTranslate = useVector(0, 0)
    const maxScrollWidth = useSharedValue((defaultOptions.maxWidth + defaultOptions.gutter) * defaultOptions.numCols * 0.25)
    const maxScrollHeight = useSharedValue((defaultOptions.maxHeight + defaultOptions.gutter) * rows.length * 0.2)
    const gestureActive = useSharedValue(false)
    const pan = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translate.x.value },
                { translateY: translate.y.value },
                {
                    scale: gestureActive.value ? withTiming(1.1, {
                        duration: 200,
                        easing: Easing.ease
                    }) : withTiming(1, {
                        duration: 230,
                        easing: Easing.ease
                    })
                }
            ],
            useNativeDriver: true,
        }
    })

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
    const panHandler = Gesture.Pan()
        .onBegin(() => {
            if (!userAcknowledgement.value || saveSharedValue.value) {
                return
            }
            offset.x.value = translate.x.value;
            offset.y.value = translate.y.value;
        })
        .onUpdate(({ translationX, translationY }) => {
            if (!userAcknowledgement.value || saveSharedValue.value) {
                return
            }
            gestureActive.value = true;
            offset.x.value = translate.x.value
            offset.y.value = translate.y.value
            if (Math.abs(offset.x.value + translationX - previousTranslate.x.value) <= maxScrollWidth.value && Math.abs(offset.y.value + translationY - previousTranslate.y.value) <= maxScrollHeight.value) {
                translate.x.value = offset.x.value + translationX - previousTranslate.x.value
                translate.y.value = offset.y.value + translationY - previousTranslate.y.value
                previousTranslate.x.value = translationX
                previousTranslate.y.value = translationY
            }
        })
        .onEnd(() => {
            if (!userAcknowledgement.value || saveSharedValue.value) {
                return
            }
            gestureActive.value = false;
            previousTranslate.x.value = 0;
            previousTranslate.y.value = 0
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
    })

    const dissolveStyleReverse = useAnimatedStyle(() => {
        return {
            opacity: saveSharedValue.value ? withTiming(0, { duration: 200, easing: Easing.ease }) : userAcknowledgement.value ? withDelay(200, withTiming(1, { duration: 300, easing: Easing.ease })) : withTiming(0, { duration: 200, easing: Easing.ease })
        }
    })

    const saveStyle = useAnimatedStyle(() => {
        return {
            opacity: saveSharedValue.value ? withTiming(0, { duration: 200, easing: Easing.ease }) : 1
        }
    })

    const [totalPages, setTotalPages] = useState(2)
    const [totalSelected, setTotalSelected] = useState(0)

    const updateTotalSelected = (reset = false, increment?: boolean) => {
        if (reset) {
            setTotalSelected(0)
            return
        }
        if (increment) {
            setTotalSelected(prev => prev + 1)
        } else {
            setTotalSelected(prev => prev - 1)
        }
    }

    const saveAction = () => {
        translate.x.value = withTiming(0, { duration: 600, easing: Easing.ease});
        translate.y.value = withTiming(0, { duration: 600, easing: Easing.ease});
        setSave(true)
    }

    return (

        <GestureDetector gesture={panHandler}>
            <View style={[$container]}>
                <StatusBar barStyle={'dark-content'} />

                <Animated.View style={[$scrollable, pan, saveOut, { zIndex: switchZIndex ? 11 : 8, minWidth: (defaultOptions.maxWidth + defaultOptions.gutter) * defaultOptions.numCols, minHeight: (defaultOptions.maxHeight + defaultOptions.gutter) * rows.length }]}>
                    <View style={[$rowContainer]} >
                        {
                            rows.map((row, i) => {
                                return (
                                    <View style={[$row, { marginTop: i > 0 ? defaultOptions.maxHeight * -0.134 + defaultOptions.gutter * 0.866 : 0 }]} key={i}>
                                        {
                                            row.map((dimNo, j) => {
                                                return <_dimensionHex {...svgFeatures} key={dimNo} backgroundColor={hexToRGBA(kauriColors.primary.dark, 0.6)} row={i} col={j} userAcknowledgement={userAck} updateTotalSelected={updateTotalSelected} totalSelected={totalSelected} gestureActive={gestureActive} save={save} />
                                            })
                                        }
                                    </View>)
                            })
                        }

                    </View>
                </Animated.View>
                <Animated.View style={[{ width: 24, position: 'absolute', top: 0, left: 16, zIndex: 12 }, $containerInsets, dissolveStyleReverse]}>

                    <Pressable onPress={() => {
                        userAcknowledgement.value = false;
                        setUserAck(false);
                        setSwitchZIndex(false)
                        setCurrentPage(0);
                    }}>
                        <BackArrow color={"#3C3A38"}/>
                    </Pressable>
                </Animated.View>
                {currentPage === 0 && <Animated.View style={[$msgScreen, dissolveStyle]}>
                    <Text style={$questionTitle}>
                        {geti18n("interestHive.title")}
                    </Text>
                    <Text style={$questionDescription}>
                        {geti18n("interestHive.description")}
                    </Text>

                </Animated.View>}
                <Animated.View style={[{ position: 'absolute', bottom: 48, zIndex: 14, }, saveStyle]}>

                    <TouchableOpacity onPress={() => {
                        if (userAck) {
                            saveAction()
                            saveSharedValue.value = true;
                            return
                        } userAcknowledgement.value = true; setUserAck(true); 
                    }} disabled={userAck && totalSelected < 1}>
                        <Animated.View style={[userAck && totalSelected < 1 ? designSystem.yellowPrimaryBtn.disabled : designSystem.yellowPrimaryBtn.enabled]}>
                            <Text style={[designSystem.textStyles.subtitle, { color: kauriColors.palette.primary.light, opacity: userAck && totalSelected < 1 ? 0.7 : 1 }]}>
                                {geti18n("common.next")}
                            </Text>
                        </Animated.View>
                    </TouchableOpacity>
                    <ScrollIndicator currentIndex={currentPage} total={totalPages} />
                </Animated.View>
            </View>
        </GestureDetector>

    )
})


const $container: ViewStyle = {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
}

const $scrollable: ViewStyle = {
    padding: 48,
}

const $rowContainer: ViewStyle = {
    alignItems: "center",
    justifyContent: "center",
}

const $row: ViewStyle = {
    flexDirection: "row",
}

const $questionTitle: TextStyle = {
    ...designSystem.textStyles.titleBig,
    color: kauriColors.primary.dark,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 16
}

const $questionDescription: TextStyle = {
    ...designSystem.textStyles.subtitle,
    color: hexToRGBA(kauriColors.primary.dark, 0.7),
    textAlign: 'center',
    width: '100%',
    marginTop: 8,
    paddingHorizontal: 16,
    marginBottom: 24
}

const $msgScreen: ViewStyle = {
    zIndex: 10, position: 'absolute', backgroundColor: hexToRGBA(kauriColors.primary.light, 0.8), top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'
}