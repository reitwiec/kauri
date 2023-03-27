import {Pressable, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import { designSystem, kauriColors } from '../theme';
import { translate as geti18n } from "../i18n";
import { BackArrow, PlusIcon } from '../svgs';
import { memo } from 'react';

export const TryBtn = memo(({onPress}:{onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{...$nextBtn, backgroundColor: kauriColors.primary.yellow, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color: kauriColors.primary.light, ...designSystem.textStyles.captionsExtraBold}}>
                        {geti18n("common.try").toUpperCase()}
                    </Text>
        </TouchableOpacity>
    )
})


const $nextBtn:ViewStyle = {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 50
}