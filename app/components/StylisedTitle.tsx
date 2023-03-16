import {memo, useState} from 'react';
import {Text, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {designSystem, kauriColors} from '../theme';
import React from 'react';

export const StylisedTitle = memo(({text, alt, small}:{text:string, alt: boolean, small:boolean}) => {
  const [textWidth, setTextWidth] = useState(50);
  return (
    <View style={alt?{alignItems: 'center'}:{}}>
      <View style={alt?{justifyContent: 'center'}:{alignSelf: 'flex-start'}}>
        <Text
          style={{
            color: kauriColors.primary.dark,
            ...designSystem.textStyles[`title${small?'Small':'Big'}`],
          }}
          onLayout={event => {
            setTextWidth(event.nativeEvent.layout.width);
          }}>
          {text}
        </Text>
      </View>
      <View style={{marginLeft: 8}}>
        <Svg
          width={textWidth / 2}
          height={5}
          viewBox={`0 0 ${textWidth / 2} 5`}
          fill="none">
          <Path
            d={`M0 4 Q${textWidth / 4} 0 ${textWidth / 2} 4`}
            stroke="#FBD25D"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </View>
  );
});
