import {Pressable, Text, View, ViewStyle} from 'react-native';
import { designSystem, kauriColors } from '../theme';
import { translate as geti18n } from "../i18n";
import { BackArrow, PlusIcon } from '../svgs';

export const TryBtn = () => {
    return (
        <Pressable style={{...$nextBtn, backgroundColor: kauriColors.secondary.lightBrown, flex:1, flexDirection: 'row', justifyContent: 'center'}}>
                    {/* <View style={{marginRight:8, width: 16, transform:[{rotate: '180deg'}]}}>
                        <BackArrow color={"#ffffff"}/>
                    </View> */}
                    {/* <View style={{marginRight: 8, width:12}}>
                        <PlusIcon/>
                    </View> */}
                    <Text style={{color: kauriColors.primary.light, ...designSystem.textStyles.captionsBold}}>
                        {geti18n("common.try")}
                    </Text>
        </Pressable>
    )
}


const $nextBtn:ViewStyle = {
    flex:1,
    margin: 16,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12
}