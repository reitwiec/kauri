import type { FC } from "react";
import {Text, View} from 'react-native';
import { designSystem, kauriColors } from "../../theme";
import {translate as geti18n} from '../../i18n';
import { hexToRGBA } from "../../utils/hexToRGBA";

interface CompletionProps{
    total: number,
    completed: number,
}
export const Completion:FC<CompletionProps> = ({total, completed}) => {
    const progressBarHeight = 6
    completed = completed>total?total:completed 
    return (
        <View style={{width: '100%', paddingHorizontal: 16}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex:1, alignItems: 'flex-start'}}>
                    <Text style={{...designSystem.textStyles.captionsExtraBold, color:kauriColors.primary.dark}}>
                        {completed}/{total}
                    </Text>
                    <Text style={{...designSystem.textStyles.smallTextsBold, color: hexToRGBA(kauriColors.primary.dark, 0.6)}}>
                        actions {geti18n('common.completed').toLowerCase()}
                    </Text>
                </View>
                <View style={{flex:1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text style={{...designSystem.textStyles.superTitleSans, color:kauriColors.primary.dark}}>
                        {(completed*100/total).toFixed(1)}
                    </Text>
                    <Text style={{...designSystem.textStyles.captions, color: hexToRGBA(kauriColors.primary.dark, 0.6)}}>
                        %
                    </Text>
                </View>
            </View>
            <View
                style={{
                    width: '100%',
                    height: progressBarHeight,
                    backgroundColor: 'rgba(251, 210, 93, 0.15)',
                    borderRadius: progressBarHeight,
                    overflow: 'hidden',
                }}
            >
                <View
                    style={[{
                        height: progressBarHeight,
                        backgroundColor: 'rgba(251, 210, 93, 1)',
                        borderRadius: progressBarHeight,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width:`${(completed*100/total).toFixed(1)}%`
                    }]}
                />
            </View>
        </View>
    )
}