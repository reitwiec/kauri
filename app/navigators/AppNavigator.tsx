import {NavigationContainer, NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {StackScreenProps} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {InterestSelectionHive, Tabs, TabStackParamList} from '../screens';
import { ActionDetails } from '../screens/Actions/ActionDetails';
import { CollectionDetails } from '../screens/Actions/CollectionDetails';
import { Trail } from '../screens/Home/Trail';

type mainScreens = 'home' | 'actions' | 'shop' | 'read' | 'you'
export type AppStackParamList = {
  onboarding_interests_hive: {totalDimensions: number};
  tabs: NavigatorScreenParams<TabStackParamList>;
  actionDetails: {
    actionId: string,
    cameFrom: mainScreens
  },
  collectionDetails: {
    collectionId: string,
    cameFrom: mainScreens
  },
  trail: undefined
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
      <Stack.Screen
          name="actionDetails"
          component={ActionDetails}
      />
      <Stack.Screen
          name="collectionDetails"
          component={CollectionDetails}
      />
      <Stack.Screen
        name="trail"
        component={Trail}
        options={{presentation: 'modal'}}
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
