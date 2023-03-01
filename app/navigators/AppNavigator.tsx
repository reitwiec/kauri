/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {NavigationContainer, NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {StackScreenProps} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {InterestSelectionHive, Tabs, TabStackParamList} from '../screens';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  onboarding_interests_hive: {totalDimensions: number};
  tabs: NavigatorScreenParams<TabStackParamList>;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

//screen name format "[FLOW]_[ROLE]_[meta]"
const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="tabs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="onboarding_interests_hive"
        component={InterestSelectionHive}
        options={{animation: 'fade'}}
      />
      <Stack.Screen
        name="tabs"
        component={Tabs}
        options={{animation: 'fade'}}
      />
    </Stack.Navigator>
  );
});

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(
  props: NavigationProps,
) {
  // useBackButtonHandler(routeName => exitRoutes.includes(routeName));
  //add navigation utils here and in the app.tsx

  return (
    <NavigationContainer {...props}>
      <AppStack />
    </NavigationContainer>
  );
});
