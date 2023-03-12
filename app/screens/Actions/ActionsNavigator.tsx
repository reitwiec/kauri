import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite";
import { Actions } from "./Actions";
import { ActionDetails } from "./ActionDetails";

export type ActionsStackParamList = {
    actionsLanding: undefined,
    actionDetails: {
        actionId: string
    }
}

const Stack = createNativeStackNavigator<ActionsStackParamList>();

export const ActionsNavigator = observer(function ActionsNavigator(){
    return (
            <Stack.Navigator
                initialRouteName="actionsLanding"
                screenOptions={{headerShown: false}}
                >
                    <Stack.Screen
                        name="actionsLanding"
                        component={Actions}
                        />
                    <Stack.Screen
                        name="actionDetails"
                        component={ActionDetails}
                    />
            </Stack.Navigator>
    )
})