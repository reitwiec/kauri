import React from 'react';
import {View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {kauriColors} from '../theme';
import {hexToRGBA} from '../utils/hexToRGBA';

interface ScrollIndicatorProps {
  currentIndex: number;
  total: number;
}

const _circle = ({current, i}) => {
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      width:
        current === i
          ? withTiming(24, {
              duration: 300, easing: Easing.inOut(Easing.quad),
            })
          : withTiming(8, {
              duration: 300,
              easing: Easing.inOut(Easing.quad),
            }),
      height: 8,
    };
  }, [current]);
  return (
    <Animated.View
      key={i}
      style={[
        {
          backgroundColor: hexToRGBA(
            kauriColors.primary.yellow,
            current === i ? 0.8 : 0.3,
          ),
          borderRadius: 10,
          margin: 4,
        },
        indicatorStyle,
      ]}
    />
  );
};

const ScrollIndicator = ({currentIndex, total}: ScrollIndicatorProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
      }}>
      {Array.from({length: total}).map((_, i) => (
        <_circle key={i} current={currentIndex} i={i} />
      ))}
    </View>
  );
};

export default ScrollIndicator;
