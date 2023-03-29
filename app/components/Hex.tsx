import { FC, useMemo } from "react"
import React from "react"
import { Path, Svg } from "react-native-svg"
import { Text, View } from "react-native"
import { hex } from "../utils/hexGenerator"
import { designSystem, kauriColors } from "../theme"
import { dimensionColorMap } from "../utils/hexDetails"
import { hexToRGBA } from "../utils/hexToRGBA"
import { CausesSelector } from "../svgs"

interface HexProps {
    title:string|null,
    dimension:string,
    size?:number,
    type?: 'small' | 'large',
    titleVisible?:boolean
}
export const Hex:FC<HexProps> = React.memo(({title, dimension, size, type, titleVisible}) =>{
    if(!size){
        size = 32
    }
    if(!type){
        type = 'small'
    }

    if(!titleVisible){
        titleVisible = false
    }
    const svgFeatures = hex(size, size/4)

    const color = useMemo(() => {
        return hexToRGBA((kauriColors.primary.dark), 0.7)
    }, [])

    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View>
            <Svg width={svgFeatures.width} height={svgFeatures.height} fill={dimensionColorMap()[dimension]}>
                <Path
                    d={svgFeatures.path}
                    />
            </Svg>
            {type === 'small' && title && <View style={{width: svgFeatures.width-20, position: 'absolute', alignSelf: 'center', top:0, bottom:0, justifyContent: 'center'}}>
                {CausesSelector(title)}
            </View>}
        </View>
        {title && titleVisible &&<Text style={{...designSystem.textStyles.smallTexts, color:color}}>
            {title}
        </Text>}
        </View>
    )
})