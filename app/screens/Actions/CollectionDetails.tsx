import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import type { AppStackParamList } from "../../navigators";
import type { TabStackParamList } from "../Tabs/Tabs";
import {View, ViewStyle} from 'react-native'
import { BusyIndicator } from "../../components";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";

type CollectionDetails = CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, 'collectionDetails'>,
    BottomTabScreenProps<TabStackParamList>
>

export const CollectionDetails:FC<CollectionDetails> = observer(function CollectionDetails(_props){
    const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom"]);
    const {collectionId} = _props.route.params
    const [busy, setBusy] = useState(true)
    
    // const [item, setItem] = useState<actionDetail>({
    //     id: -1,
    //     url: 0,
    //     title: '',
    //     type: "habit",
    //     totalCauses: 0,
    //     topCauses: [],
    //     causes: [],
    //     problemStatement: '',
    //     solution: '',
    //     status: 'completed',
    //     impactDist: {effort: 'high', expense: 'high', impact: 'high'},
    //     milestones: [],
    //     timesCompleted: 0,
    //     kauriUsersCompleted: 0
    // })

    useEffect(() => {
        setTimeout(()=>{
            // setItem(getActionDetails(collectionId))
            setBusy(false)
        }, 300)
    }, [])
    return (
        <View style={{...$container, paddingTop: $containerInsets.paddingTop}}>
            { busy?
                <BusyIndicator/>:
                <></>
            }
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1,
}