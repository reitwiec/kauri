import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import type { FC } from "react";
import { StatusBar, Text, View, ViewStyle } from "react-native";
import type { AppStackParamList } from "../../navigators";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import type { TabStackParamList } from "../Tabs/Tabs";

type ReadProps = CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, 'read'>,
    NativeStackScreenProps<AppStackParamList>
>
export const Read:FC<ReadProps> = observer(function Read(_props){
    const $containerInsets = useSafeAreaInsetsStyle(["top"])
    return (
        <View style={[$container, $containerInsets]}>
            <StatusBar barStyle={'dark-content'} backgroundColor="#fff"/>
            <Text>
                READ SCREEN
            </Text>
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1
}
