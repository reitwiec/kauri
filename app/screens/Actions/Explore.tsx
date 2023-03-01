import { observer } from "mobx-react-lite";
import type { FC, useEffect } from "react";
import { Text, View } from "react-native";

export interface ExploreProps{
    riveHeight: number,
}

export const Explore:FC<ExploreProps> = observer(function explore({}){

    return (
        <View style={{width: "100%", backgroundColor: 'red'}}>
            <Text>Explore</Text>
        </View>
    )
})