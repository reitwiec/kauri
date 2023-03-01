import { observer } from "mobx-react-lite";
import type { FC } from "react";
import { Text, View } from "react-native";

export interface ImpactProps{
    riveHeight: number,
}

export const Impact:FC<ImpactProps> = observer(function impact({}){
    return (
        <View style={{width: "100%", backgroundColor: 'red'}}>
            <Text>Impact</Text>
        </View>
    )
})