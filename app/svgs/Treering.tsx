import {useWindowDimensions, View} from 'react-native';
import { Extrapolate, interpolate } from 'react-native-reanimated';
import { Circle, G, Path, Svg } from 'react-native-svg';
import { kauriColors } from '../theme';
import { dimensionColorMap } from '../utils/hexDetails';

export const Treering = ({ cumulativeSeconds, total}) => {
const rotation = (Math.random()*100)%360
const {width:windowWidth} = useWindowDimensions()
const maxScale = (windowWidth-32-32)/179
  return (
    <View style={{aspectRatio: 1}}>
      <Svg viewBox="0 0 72 72" width={"100%"} height={"100%"}>
      {Array.from({length: total}).map((i, j)=>{
                        const isYearEnd = j!== 0 && j%100 ===0
                        let scale = 1
                        let strokeWidth = isYearEnd ? 1: 0.2
                        if(cumulativeSeconds.length > j && typeof cumulativeSeconds[j] === "number") {
                            scale = interpolate(cumulativeSeconds[j]!, [0, cumulativeSeconds[total-1]!], [0, maxScale], Extrapolate.CLAMP)
                        }
                        const dimensions = ["dimension1", "dimension2", "dimension3", "dimension4", "dimension5"]
                        const selectedDimension = dimensions[Math.floor(Math.random() * dimensions.length)]
                        return (
                            <Path key={j} d="M35.7,18l-1.2,0.1l-0.8,0.4 c0,0-1.1,0-1.1,0c-1.7,0.3-3.5,0.7-4.9,1.7c-0.2,0.1-0.4,0.3-0.6,0.4
                                c-0.2,0.1-0.4,0.2-0.6,0.3c-1,0.4-1.9,0.9-2.8,1.4c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.4,0.6
                                c-0.8,1-0.9,1.2-2,2.2c-0.3,0.8-1,2-1.3,2.7c-0.2,0.8-0.5,1.5-0.7,2.3c-0.3,0.8-0.5,1.6-0.7,2.5c-0.7,3.5,0.4,7,1.4,10.4
                                c0.2,0.6,0.6,0.9,1,1.4l0.7,1l0.6,0.8l0.9,1.1l0.6,0.2c0,0,0.4,0.2,0.5,0.4c0.3,0.7,1.2,1.7,1.8,2.2c0.8,0.7,1.8,1,2.8,1.3
                                c0.4,0.1,0.8,0.3,1.3,0.2c0.5,0,0.7,0,1.1,0.3c0.3,0.2,0.6,0.2,0.9,0.4c0.3,0.2,0.6,0.3,1,0.4c1,0.3,2,0.5,3.1,0.5
                                c0.5,0,0.9-0.1,1.4-0.2c1.6-0.3,3.1-0.5,4.7-0.8c0.6-0.1,1.2-0.2,1.7-0.4c1.1-0.4,2.1-1,2.9-1.9c0.7-0.8,1.9-1.6,2.5-2.5
                                c1.1-1.5,2.5-2.1,3.4-3.8c0.8-1.4,0.5-3.2,0.8-4.7c0.1-0.5,0.3-1,0.5-1.6c0.4-1.5,0.4-3-0.1-4.5c-0.1-0.4-0.3-0.8-0.4-1.2
                                c-0.1-0.4,0-0.9,0-1.3c0-0.8-0.4-1.6-0.7-2.4c-0.3-0.8-0.7-1.6-1-2.5c-0.1-0.3-0.2-0.6-0.4-0.8c-0.2-0.2-0.4-0.4-0.6-0.6
                                c-1.5-1.5-3.1-2.9-4.6-4.4c-0.2-0.2-0.4-0.3-0.6-0.5c-0.2-0.1-0.5-0.2-0.7-0.3c-1.3-0.3-2.5-0.8-3.7-1.2c-0.6-0.2-1.4-0.3-2-0.7
                                c-0.2-0.2-1.2-0.3-1.4-0.3S35.7,18,35.7,18z" fill="none" strokeWidth={strokeWidth} stroke={isYearEnd?kauriColors.secondary.tanBrown:dimensionColorMap()[selectedDimension!]} scale={scale} translateX={(1-scale)*36} translateY={(1-scale)*36} transform={`rotate(${rotation}, 36, 36)`}/>
                        )
        })}
    </Svg>
    </View>
  );
};
