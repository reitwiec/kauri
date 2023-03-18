import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { Extrapolate, interpolate } from "react-native-reanimated";
import { Treering } from "../../svgs";
import { kauriColors } from "../../theme";
import { dimensionColorMap } from "../../utils/hexDetails";

export interface ImpactProps{
    riveHeight: number,
}

export const Impact:FC<ImpactProps> = observer(function impact({}){
    const [isBusy, setIsBusy] = useState(true)
    const [cumulativeSeconds, setCumulativeSeconds] = useState<number[]>([])
    const total = 200
    const {width:windowWidth} = useWindowDimensions()

    useEffect(() => {
      let totalSeconds = 0
      const impacts = [0.1, 0.5, 1]
      const cumulativeSeconds:number[] = []
      Array.from({length: total}).forEach((i, j) => {
        const second = impacts[Math.floor(Math.random() * impacts.length)]!*10
        totalSeconds += second
        cumulativeSeconds.push(totalSeconds)
      })
      setCumulativeSeconds(cumulativeSeconds)
      setIsBusy(false)
    }, [])
    
    return (
        <View style={{width: "100%", alignItems: 'center'}}>
            {
                isBusy?<Text>
                    Loading...
                </Text>:
                <View style={{width: windowWidth-32, height: (windowWidth-32), padding: 16, backgroundColor: "#FFFDEC", borderRadius: 12}}>
                    <Treering color={dimensionColorMap()["dimension2"]} cumulativeSeconds={cumulativeSeconds} total={total}/>
                </View>
            }
        </View>
    )
})