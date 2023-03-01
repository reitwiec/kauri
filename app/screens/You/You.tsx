import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import type { FC } from "react";
import { Button, StatusBar, Text, View, ViewStyle } from "react-native";
import type { AppStackParamList } from "../../navigators";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import type { TabStackParamList } from "../Tabs/Tabs";

type YouProps = CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, "you">,
    NativeStackScreenProps<AppStackParamList>
>
export const You:FC<YouProps> = observer(function You(_props){
    const $containerInsets = useSafeAreaInsetsStyle(["top"])
    return (
        <View style={[$container, $containerInsets]}>
            <StatusBar barStyle={'dark-content'} backgroundColor="#fff"/>
            <Text>
                ACCOUNT SCREEN
            </Text>
            <Button title="Go to onboarding" onPress={()=>{
                _props.navigation.navigate('onboarding_interests_hive',{totalDimensions: 23})
            }}/>
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1
}