import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export const BackArrow = ({color}) => {
  if(!color){
    color = "#3C3A38"
  }
  return (
    <View style={{aspectRatio: 23 / 19}}>
      <Svg width="100%" height="100%" viewBox="0 0 23 19" fill="none">
        <Path
          d="M1 9.32227L22 9.32227"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M1 9.32227L9 1"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M1 9.32227L9 18"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};
