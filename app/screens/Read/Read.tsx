import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, memo, useCallback, useRef, useState } from "react";
import { Button, StatusBar, Text, useWindowDimensions, View, ViewStyle } from "react-native";
import { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import type { AppStackParamList } from "../../navigators";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import type { TabStackParamList } from "../Tabs/Tabs";
import debounce from "lodash.debounce";
import useIsReady from "../../utils/useIsReady";
import { RiveHeader } from "../../components";
import { readChips, shopChips } from "../../mockdata";
import { Canvas, Fill, Group, Rect, RoundedRect, runTiming, Shader, Skia, SkiaMutableValue, SweepGradient, useClockValue, useComputedValue, useTouchHandler, useValue, vec } from "@shopify/react-native-skia";


  type RoundedItemProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    point: SkiaMutableValue<{
      x: number;
      y: number;
    } | null>;
    progress: SkiaMutableValue<number>;
  };
  
  const RoundedItem: React.FC<RoundedItemProps> = memo(
    ({ point, progress, ...squareProps }) => {
      const { x, y, width, height } = squareProps;
      const {width: winWidth, height: winHeight} = useWindowDimensions()
      const MAX_DISTANCE = Math.sqrt(winWidth ** 2 + winHeight ** 2);
      const previousDistance = useValue(MAX_DISTANCE/2);
      const previousTouchedPoint = useValue({
        x: winWidth / 2,
        y: winHeight / 2,
      });
  
      const distance = useComputedValue(() => {
        if (point.current == null) return previousDistance.current;
        previousDistance.current = Math.sqrt(
          (point.current.x - x) ** 2 + (point.current.y - y) ** 2
        );
        return previousDistance.current;
      }, [point]);
  
      const scale = useComputedValue(() => {
        return interpolate(
          distance.current,
          [0, MAX_DISTANCE],
          [0, 1],
          {
            extrapolateLeft: Extrapolate.CLAMP,
            extrapolateRight: Extrapolate.CLAMP,
          }
        );
      }, [distance, progress]);
  
      const transform = useComputedValue(() => {
        return [{ scale: scale.current }];
      }, [scale]);
  
      const origin = useComputedValue(() => {
        if (point.current == null) {
          return previousTouchedPoint.current;
        }
        previousTouchedPoint.current = point.current;
        return previousTouchedPoint.current;
      }, [point]);
  
      return (
        <Group origin={origin} transform={transform}>
          <RoundedRect {...squareProps} r={4} />
        </Group>
      );
    }
  );
  
  export { RoundedItem };



type ReadProps = CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, "read">,
    NativeStackScreenProps<AppStackParamList>
>
export const Read:FC<ReadProps> = observer(function Read(_props){
    const $containerInsets = useSafeAreaInsetsStyle(["top"])
    const {width: winWidth, height: winHeight} = useWindowDimensions()
    const riveHeight = 240
    const translationY = useSharedValue(0)
    const [filterState, setFilterState] = useState({})
    const [isSearching, setIsSearching] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState('')

    const updateReadState = useCallback((key:any)=>{
        console.log(key)
    },[])

    const isReady = useIsReady()
    const filteredData = []

    const fetchFilteredData = () =>{
        // console.log("API call here")
        // console.log("filterState", config)
        // console.log("pagetype:", pageType)
    }
    
    const updateFilteredState = (key, value) => {
        const previousFilterState = filterState

        const config = {
            ...previousFilterState,
            [key]: value,
        }
        setFilterState(config);
        fetchFilteredData()
    }

    const debounceFilterCall = useCallback(
        debounce((key, value) => {
            updateFilteredState(key, value);
        }, 500),
        [],
    );
    const updateSearchPhrase = (phrase:string) => {
        setSearchPhrase(phrase)
        debounceFilterCall("searchQuery", phrase)
    }

    const searchClicked = (override, searchPhrase:string) => {
        // if(!isSearching){
        //     states[actionsState].scrollToTop()
        // }
        if(searchPhrase.length !== 0){
            return
        }
        if(override !== undefined){
            setIsSearching(override)
            return
        }
        setIsSearching(prev => !prev)
    }

    const $scrollContainer_animated = useAnimatedStyle(()=>{
        return {
            transform:[
                {translateY: interpolate(
                    translationY.value,
                    [0, 200],
                    [riveHeight, 100],
                    Extrapolate.CLAMP
                )}
            ]
        }
    }, [translationY])

    const source = Skia.RuntimeEffect.Make(`
        uniform float4 colors[4];
        uniform float2 center;
        uniform float2 pointer;
        uniform float2 canvasDimensions;
        uniform float clock;
        const float4 black = vec4(0, 0, 0, 1);

        vec4 main(vec2 xy) {
        vec2 cPos = -1 + 2*xy/canvasDimensions;
        float cLength = length(cPos);
        float4 color = black;
        // return vec4(
        //     (sin(xy.x + clock/40) +1)/2,
        //     (cos(xy.y + clock/40) +1)/2,
        //     (cos(xy.x + xy.y + clock/40)+1)/2,
        //     1
        // ); 
        // float tex = cos(cLength*12 - clock/150)*0.08/cLength;
        // float tex2 = -1 * exp(1 * -cLength)*cos(6*cLength -clock/75);
        // float trans = exp(-cLength + 2.0) * sin(0.5 * cLength);
        return vec4(0, 0, 0, 1);
        }`)!;

    const center = vec(winWidth / 2, winHeight / 2);
    const canvasDimensions = vec(winWidth, winHeight)
    const pointer = useValue(vec(0, 0));
    const onTouch = useTouchHandler({
        onStart: (e) => {
            console.log('start', e.id)
            pointer.current = e
        },
        onActive: (e) => {
            console.log('active',e.id)
            pointer.current = e;
        },
        onEnd: (e) => {
            //when tap, see if end id === active id
            // if not same then its tap
            // else dont do anything
            console.log('end',e.id)
        }

    });
    const colors = ["#dafb61", "#61DAFB", "#fb61da", "#61fbcf"].map((c) =>
        Skia.Color(c)
    );
    const clock = useClockValue();
    const uniforms = useComputedValue(
        () => ({colors, center, pointer: pointer.current, canvasDimensions, clock: clock.current}),
        [pointer, clock]
    );

    const SQUARE_CONTAINER_SIZE = winWidth / 5
    const PADDING = 20
    const SQUARE_SIZE = SQUARE_CONTAINER_SIZE - PADDING

    const touchedPoint = useValue<{ x: number; y: number } | null>(null);

    const progress = useValue(0);

    const touchHandler = useTouchHandler({
        onStart: (event) => {
        runTiming(progress, 1, { duration: 300 });
        touchedPoint.current = { x: event.x, y: event.y };
        },
        onActive: (event) => {
        touchedPoint.current = { x: event.x, y: event.y };
        },
        onEnd: () => {
        runTiming(progress, 0, { duration: 300 });
        touchedPoint.current = null;
        },
    });

    return (
        <View style={[$container, $containerInsets]}>
            <StatusBar barStyle={'dark-content'} backgroundColor="#fff"/>
            {/* <RiveHeader translationY={translationY} data={readChips} config={{right: ['customise'],left:["filter", "search"], height: riveHeight}} screenState={updateReadState} isSearching={isSearching} searchClicked={searchClicked} updateSearchPhrase={updateSearchPhrase}/> */}
            {/* <Button title="Go to onboarding" onPress={()=>{
                _props.navigation.navigate('onboarding_interests_hive',{totalDimensions: 23})
            }}/> */}
            <Canvas style={{ width: winWidth, height: winHeight, backgroundColor: '#fff'}} onTouch={touchHandler}>
            <Group>
                {new Array(5).fill(0).map((_, i) => {
                    return new Array(11).fill(0).map((_, j) => {
                    return (
                        <RoundedItem
                        progress={progress}
                        point={touchedPoint}
                        key={`i${i}-j${j}`}
                        x={i * SQUARE_CONTAINER_SIZE + PADDING / 2}
                        y={j * SQUARE_CONTAINER_SIZE + PADDING / 2}
                        width={SQUARE_SIZE}
                        height={SQUARE_SIZE}
                        />
                    );
                    });
                })}
                <SweepGradient
                    c={vec(winWidth / 2, winHeight / 2)}
                    colors={['cyan', 'magenta', 'yellow', 'cyan']}
                />
                </Group>
            </Canvas>
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1
}