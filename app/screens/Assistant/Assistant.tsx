import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { MotiView } from "moti";
import { FC, useState } from "react";
import { Button, Keyboard, ScrollView, StatusBar, Text, TextInput, TouchableWithoutFeedback, useWindowDimensions, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import type { AppStackParamList } from "../../navigators";
import { CrossIcon, HistoryIcon } from "../../svgs";
import { designSystem, kauriColors } from "../../theme";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import type { TabStackParamList } from "../Tabs/Tabs";

type AssistantProps = CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, "assistant">,
    NativeStackScreenProps<AppStackParamList>
>
export const Assistant:FC<AssistantProps> = observer(function You(_props){
    const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom"])
    const {height: windowHeight} = useWindowDimensions()
    const examples = ["What's new?", "Give me an action that is easy"]
    const [localSearchPhrase, setLocalSearchPhrase] = useState('') 

    const updateLocalSearchPhrase = (phrase:string) => {
        setLocalSearchPhrase(phrase)
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[$container, $containerInsets, {paddingHorizontal: 16}]}>
                <StatusBar barStyle={'dark-content'} backgroundColor="#fff"/>
                <View style={{paddingVertical:16, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity 
                        style={{flexDirection: 'row', alignItems: 'center', ...designSystem.card}}
                        onPress={()=>{
                            updateLocalSearchPhrase('')
                        }}>
                            <View style={{width:12}}>
                                <CrossIcon color={kauriColors.primary.dark}/>
                            </View>
                            <Text style={{...designSystem.textStyles.smallTexts, color:kauriColors.primary.dark, marginLeft:8}}>
                                Clear search
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flexDirection: 'row', alignItems: 'center', ...designSystem.card}}
                        onPress={()=>{
                            updateLocalSearchPhrase('')
                        }}>
                            <View style={{height:12}}>
                                <HistoryIcon/>
                            </View>
                            <Text style={{...designSystem.textStyles.smallTexts, color:kauriColors.primary.dark, marginLeft:8}}>
                                Show history
                            </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <Animated.View style={[{justifyContent: 'flex-start', paddingVertical: 16, maxHeight: windowHeight/2}]}><TextInput
                    style={{width: '100%', ...designSystem.textStyles.assistantSans, color: kauriColors.primary.dark, padding:0, alignItems: 'center', justifyContent: 'center'}}
                    placeholder={"let me help you"}
                    autoFocus={true}
                    multiline
                    blurOnSubmit
                    placeholderTextColor={kauriColors.primary.unselectedLight}
                    value={localSearchPhrase}
                    onChangeText={updateLocalSearchPhrase}
                    onBlur={() => {
                        console.log('call search endpoint...')
                        if (localSearchPhrase.trim().length === 0) {
                            updateLocalSearchPhrase('');
                        }
                    }}
                    />
                    </Animated.View>
                    {localSearchPhrase.trim().length === 0 && <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Text style={{color: kauriColors.primary.dark, ...designSystem.textStyles.titleSans}}>
                            Examples of what you can ask...
                        </Text>
                        <View>
                            {
                                examples.map((example, index) =>{
                                    return (
                                        <TouchableOpacity key={index} style={{marginTop:16}} onPress={()=>{
                                                Keyboard.dismiss()
                                                updateLocalSearchPhrase(example)
                                            }}>
                                            <Text style={{color: kauriColors.primary.dark, ...designSystem.textStyles.captionsExtraBold, paddingVertical:4}}>
                                                {`>`} {example}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </MotiView>}
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1
}