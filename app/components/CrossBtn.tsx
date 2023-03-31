import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity, View } from "react-native"
import { CrossIcon } from "../svgs"
import { kauriColors } from "../theme"
import { hexToRGBA } from "../utils/hexToRGBA"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

export const CrossBtn = () => {
    const navigation = useNavigation()
    const $containerInsets = useSafeAreaInsetsStyle(["top"])
    return (
        <View style={{ position: 'absolute', top: $containerInsets.paddingTop?Number($containerInsets.paddingTop)+4:16, right: 16, backgroundColor: hexToRGBA(kauriColors.primary.chipBar, 0.3), padding:6, borderRadius: 24}}>
                    <TouchableOpacity style={{width: 16}} activeOpacity={0.9} onPress={()=>navigation.goBack()} hitSlop={{top: 20, left:20, right: 20, bottom:20}}>
                        <CrossIcon color={kauriColors.primary.dark}/>
                    </TouchableOpacity>
        </View>
    )
}