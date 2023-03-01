import { observer } from "mobx-react-lite";
import type { FC } from "react";
import { Text, View } from "react-native";

export interface AnalyticsProps{
    riveHeight: number,
}

export const Analytics:FC<AnalyticsProps> = observer(function analytics({}){
    return (
        <View style={{width: "100%", backgroundColor: 'red'}}>
            <Text>Analytics</Text>
        </View>
    )
})