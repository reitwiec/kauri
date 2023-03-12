import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import {Text, View, ViewStyle} from 'react-native'
import { BusyIndicator, Thumbnail } from '../../components'
import { kauriColors } from '../../theme'
import { useSafeAreaInsetsStyle } from '../../utils/useSafeAreaInsetsStyle'
import type { TabStackParamList } from '../Tabs/Tabs'
import type { ActionsStackParamList } from './ActionsNavigator'

type ActionDetailsProps = CompositeScreenProps<
    NativeStackScreenProps<ActionsStackParamList, 'actionDetails'>,
    BottomTabScreenProps<TabStackParamList>
>
export const ActionDetails:FC<ActionDetailsProps> = observer((_props) =>{
    const THUMBNAIL_WIDTH = 136
    const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom"]);
    const {actionId} = _props.route.params
    const [busy, setBusy] = useState(true)
    const [item, setItem] = useState<any>(null)

    useEffect(() => {
        setTimeout(()=>{
            setBusy(false)
        }, 300)
    }, [])
    

    return (
        <View style={{...$container, ...$containerInsets}}>
            { busy?
                <BusyIndicator/>:
                <View>
                    <Text style={{color: kauriColors.primary.dark}}>
                        {actionId}
                    </Text>
                </View>
                    // <Thumbnail src={item.url} width={THUMBNAIL_WIDTH} height={THUMBNAIL_WIDTH} title={item.title} type={"large"} actionType={item.type} activeIndexVal={null} index={index} pretty={false} stacked={false} status={item.status} isNew={false}/>
                }
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1
}