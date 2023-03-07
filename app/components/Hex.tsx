import type { FC } from "react"
import React from "react"
import { Path, Svg } from "react-native-svg"
import { Text, View } from "react-native"
import { hex } from "../utils/hexGenerator"
import { designSystem, kauriColors } from "../theme"
import { dimensionColorMap } from "../utils/hexDetails"
import { hexToRGBA } from "../utils/hexToRGBA"

export const Hex:FC<{title:string|null, dimension:string}> = React.memo(({title, dimension}) =>{
    const svgFeatures = hex(32, 32/4)
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>

        <Svg width={svgFeatures.width} height={svgFeatures.height} fill={dimensionColorMap()[dimension]}>
            <Path
                d={svgFeatures.path}
                />
        </Svg>
        {title &&<Text style={{...designSystem.textStyles.smallTextsSemi, color: hexToRGBA((kauriColors.primary.dark), 0.7)}}>
            {title}
        </Text>}
        </View>
    )
})