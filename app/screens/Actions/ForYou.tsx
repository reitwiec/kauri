import { observer } from "mobx-react-lite";
import type { FC } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { designSystem, kauriColors } from "../../theme";
import { translate as geti18n } from "../../i18n"
import { hexToRGBA } from "../../utils/hexToRGBA";
import { RetryIcon } from "../../svgs";
import { StylisedTitle } from "../../components";
import { roadMap } from "../../mockdata";
import { Timeline } from "./Timeline";
import React from "react";
import type Animated from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import { FeatureThumbnail } from "./FeatureThumbnail";

export interface ForYouProps{
    riveHeight: number,
    translationY: SharedValue<number>
}

export const ForYou:FC<ForYouProps> = observer(function analytics({riveHeight, translationY}){
    const windowWidth = useWindowDimensions().width
    
    const Header = React.memo(()=>{
        return(
            <View style={{marginBottom: 24}}>
                <View style={{marginBottom: 24}}>
                    {/* <StylisedTitle text={geti18n("actions.nextActionForYou")} alt={true}/> */}
                    <Text style={{...designSystem.textStyles.captionsBold, color: kauriColors.primary.dark}}>
                        {geti18n("actions.nextActionForYou")}
                    </Text>
                </View>
                <FeatureThumbnail data={roadMap.nextAction}/>
                {/*<Text style={{textAlign: 'left', color: hexToRGBA(kauriColors.primary.dark, 0.7), ...designSystem.textStyles.paragraph, marginTop: 8}}>
                    {geti18n("actions.personalisedRoadmapDescription")}
                </Text>
                <Pressable style={{marginTop: 24, flexDirection: 'row'}}>
                    <View style={{opacity: 0.7}}>
                        <RetryIcon/>
                    </View>
                    <Text style={{...designSystem.textStyles.captions, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                        {geti18n("actions.recreate")}
                    </Text>
                </Pressable> */}
            </View>
        )
    })
    return (
            <View style={{ width: windowWidth}}>
                <Timeline data={roadMap.resources} Header={Header} translationY={translationY}/>
            </View>
    )
})