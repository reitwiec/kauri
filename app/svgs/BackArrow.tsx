import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export const BackArrow = ({color, alt}) => {
  if(!color){
    color = "#3C3A38"
  }
  const viewBox = [
    {
      w: 23,
      h: 19
    },
    {
      w: 10,
      h: 19
    }
  ]

  const vbSetting = `0 0 ${viewBox[alt?1:0]?.w} ${viewBox[alt?1:0]?.h}`
  return (
    <View style={{aspectRatio: (viewBox[alt?1:0]?.w as any) / (viewBox[alt?1:0]?.h as any)}}>
      <Svg width="100%" height="100%" viewBox={vbSetting} fill="none">
        {!alt && <Path
          d="M1 9.32227L22 9.32227"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />}
        <Path
          d="M1 9.32227L9 1"
          stroke={color}
          strokeWidth={alt?3:2}
          strokeLinecap="round"
        />
        <Path
          d="M1 9.32227L9 18"
          stroke={color}
          strokeWidth={alt?3:2}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};
