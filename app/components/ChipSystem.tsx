import {observer} from 'mobx-react-lite';
import {useEffect, useRef, useState} from 'react';
import {findNodeHandle, Pressable, Text, useWindowDimensions, View} from 'react-native';
import {designSystem, kauriColors} from '../theme';
import {hexToRGBA} from '../utils/hexToRGBA';
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface Chips {
  id: number;
  title: string;
  to: string;
  isGreen?: boolean;
}
interface ChipSystemProps {
  data: Chips[];
  screenState: (key: string) => void;
}

export const ChipSystem = observer(function ChipSystem({
  data,
  screenState,
}: ChipSystemProps) {
  const windowWidth = useWindowDimensions().width;
  const [selected, setSelected] = useState(0);
  const [screen, setScreen] = useState('')
  const chipFeaturesVal = useSharedValue({x: 0, y: 0, width: 0.1});
  const initialMountOfChips = useSharedValue<"START" | "MIDDLE" | "END">('START');
  let darkSelectedBackgroundRGBA = hexToRGBA(kauriColors.primary.dark, 1);
  darkSelectedBackgroundRGBA = darkSelectedBackgroundRGBA.substring(
    0,
    darkSelectedBackgroundRGBA.length - 3,
  );

  const {assignRef, scrollToPos, indicatorRef, assignParentRef, parentRef} = useChipBarAnimation(selected);

  useEffect(() => {
    if (Object.keys(scrollToPos).length > 0) {
      if (scrollToPos.width === 0 || screen.length === 0){
        return;
      }

      chipFeaturesVal.value = {
        x: scrollToPos.x -16,
        y: scrollToPos.y,
        width: scrollToPos.width,
      };
      parentRef.current?.scrollTo({
        x: scrollToPos.x - 0.1 * windowWidth,
        y: scrollToPos.y,
        animated: true,
      });
      screenState(screen);
    }
  }, [chipFeaturesVal, scrollToPos]);

  const animatedChipIndicator = useAnimatedStyle(() => {
    if (initialMountOfChips.value === "START"){
      return {
        opacity: 0
      }
    }
    if(initialMountOfChips.value === "END"){
      return {
        transform: [
          {
            translateX: withTiming(chipFeaturesVal.value.x, {
              duration: 300,
              easing: Easing.inOut(Easing.ease),
            }),
          },
          {
            translateY: withTiming(chipFeaturesVal.value.y, {
              duration: 300,
              easing: Easing.inOut(Easing.ease),
            }),
          },
        ],
        width: withTiming(chipFeaturesVal.value.width, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        }),
        opacity: withTiming(1)
      };
    }

    return {}
  }, [initialMountOfChips, chipFeaturesVal]);

  return (
    <Animated.ScrollView
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      ref={assignParentRef}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: hexToRGBA(kauriColors.primary.chipBar, 0.3),
          marginHorizontal: 16,
          borderRadius: 16,
        }}>
        {data.map((item, index) => {
          return (
            <Pressable
              renderToHardwareTextureAndroid={true}
              onPress={() => {
                setSelected(index);
                setScreen(item.to)
              }}
              key={index}
              style={[
                {zIndex: 10, opacity: 1},
                data.length <= 2 && {width: (windowWidth - 32) * 0.5},
              ]}
              ref={assignRef}
              onLayout={event => {
                const {x, y, width} = event.nativeEvent.layout;
                if (index !== 0) {
                  return;
                }
                //initial set here
                setScreen(item.to)
                chipFeaturesVal.value = {x, y, width};
                initialMountOfChips.value = "END";
              }}>
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    {
                      color:
                        selected === index
                          ? kauriColors.primary.light
                          : kauriColors.primary.unselectedLight,
                    },
                    designSystem.textStyles.captionsBold,
                  ]}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          );
        })}
        <Animated.View
          ref={indicatorRef}
          style={[
            {
              height: '100%',
              position: 'absolute',
              left: 0,
              backgroundColor: `${darkSelectedBackgroundRGBA},1)`,
              borderRadius: 16,
            },
            animatedChipIndicator,
          ]}
        />
      </View>
    </Animated.ScrollView>
  );
});

function useChipBarAnimation(activeIndex) {
  const chipRefs = useRef<any>([]);
  const parentRef = useRef<any>()
  const [scrollToPos, setScrollPos] = useState({
    x: 0,
    y:0,
    width:0
  });
  const indicatorRef = useRef(null);

  function assignRef(ref) {
    chipRefs.current.push(ref);
  }

  function assignParentRef(ref) {
    parentRef.current = ref;
  }

  useEffect(() => {
    const chipRef = chipRefs.current[activeIndex];
    chipRef.measureLayout(
      findNodeHandle(parentRef.current),
      (x, y, width) => {
        setScrollPos({x, y, width})
      },
    )
  }, [activeIndex]);

  return {assignRef, scrollToPos, indicatorRef, assignParentRef, parentRef};
}
