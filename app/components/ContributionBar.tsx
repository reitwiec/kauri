import { memo } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { dimensionColorMap } from "../utils/hexDetails";

export const ContributionBar = ({contributions, totalContributions}:{contributions: {}, totalContributions: number}) => {
    const height = 6
    let previousContribution = 0;
    return (
        <View
        style={{
            width: '100%',
            height: height,
            borderRadius: height,
            overflow: 'hidden',
        }}
    >
        {
            Object.keys(contributions).map((dimension, index)=>{
                const contribution = contributions[dimension]
                const contributionPercentage = contribution*100/totalContributions 
                const width = previousContribution + contribution*100/totalContributions;
                const tempPrevContribution = previousContribution
                previousContribution = width;
                return (<Animated.View
                key={index}
                style={[{
                    height: height,
                    backgroundColor: dimensionColorMap()[dimension],
                    position: 'absolute',
                    top: 0,
                    left: `${tempPrevContribution}%`,
                    width: `${contributionPercentage}%`,
                }, ]}
            />)
            })
        }
    </View> 
    );
}