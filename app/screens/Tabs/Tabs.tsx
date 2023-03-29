import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef, useState } from "react";
import { Dimensions, EmitterSubscription, Keyboard, Platform, Text, View, ViewStyle } from "react-native";
import { BottomTab } from "../../components";
import type { AppStackParamList } from "../../navigators";
import { Actions } from "../Actions/Actions";
import { Assistant } from "../Assistant/Assistant";
import { Home } from "../Home/Home";
import { Read } from "../Read/Read";
import { Shop } from "../Shop/Shop";
import { You } from "../You/You";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// interface TabsProps extends AppStackScreenProps<"tabs">{}
type TabsProps = NativeStackScreenProps<AppStackParamList, "tabs">

export type TabStackParamList={
    home: undefined,
    actions: undefined,
    shop: undefined,
    read: undefined,
    you: undefined,
    assistant: undefined,
}

//not required
export type TabStackScreenProps<T extends keyof TabStackParamList> = BottomTabScreenProps<
TabStackParamList,
T
>

const Tab = createBottomTabNavigator<TabStackParamList>()

const useTabBarVisibility = () => {
	const [visible, setVisible] = useState(true);
	const keyboardEventListeners = useRef<EmitterSubscription[]>([]);

	useEffect(() => {
		const listeners = keyboardEventListeners.current;

		if (Platform.OS === 'android') {
			listeners?.push(
				Keyboard.addListener('keyboardDidShow', () =>
					setVisible(false),
				),
			);
			listeners?.push(
				Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
			);
		}

		return () => listeners && listeners.forEach((event) => event.remove());
	}, []);

	return visible;
};

export const Tabs:FC<TabsProps> = observer(function Tabs(_props){
    const visible  = useTabBarVisibility()
    return (
        <View style={[$container]}>
            <Tab.Navigator
            initialRouteName={'home'}
            tabBar={props => <BottomTab {...props} />}
            screenOptions={{
              headerShown: false,
              tabBarHideOnKeyboard: true,
              tabBarStyle: {
                display: visible?'flex': 'none'
              },
              unmountOnBlur: false,
            }}
            >
                <Tab.Screen name="home" component={Home} />
                <Tab.Screen name="actions" component={Actions}/>
                <Tab.Screen name="assistant" component={Assistant}/>
                <Tab.Screen name="shop" component={Shop}/>
                <Tab.Screen name="read" component={Read}/>
                {/* <Tab.Screen name="you" component={You}/> */}

            </Tab.Navigator>
        </View>
    )
})

const $container:ViewStyle = {
    width: windowWidth,
    height: windowHeight
}