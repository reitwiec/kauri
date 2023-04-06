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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Svg width={svgFeatures.width} height={svgFeatures.height} fill={dimensionColorMap()[dimension]}>
                <Path
                    d={svgFeatures.path}
                    />
            </Svg>
            {type === 'small' && title && <View style={{width: svgFeatures.width-20, position: 'absolute', alignSelf: 'center', top:0, bottom:0, justifyContent: 'center'}}>
                {CausesSelector(title)}
            </View>}

            {type === 'large' && title && 
            <View style={{position: 'absolute', alignSelf: 'center', justifyContent: 'center', alignItems: 'center',width:svgFeatures.width, height: 0.75*svgFeatures.height}}>
                <View style={{flexBasis: "50%", padding:4}}>
                    {CausesSelector(title)}
                </View>
                
                 <Text style={{ ...designSystem.textStyles.smallTextsBold, color:"#fff", flexBasis: '50%', textAlign: 'center', padding:4, fontSize:10}} numberOfLines={2}>
                    {title}
                </Text>
            </View>}
        </View>
        {title && titleVisible &&<Text style={{...designSystem.textStyles.smallTexts, color:color, textAlign: 'center'}}>
            {title}
        </Text>}
        </View>
    )
})