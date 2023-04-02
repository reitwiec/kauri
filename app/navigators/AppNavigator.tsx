import {NavigationContainer, NavigatorScreenParams} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import {InterestSelectionHive, Tabs, TabStackParamList} from '../screens';
import { ActionDetails } from '../screens/Actions/ActionDetails';
import { CollectionDetails } from '../screens/Actions/CollectionDetails';
import { Trail } from '../screens/Home/Trail';
import { ReadDetail } from '../screens/Read/ReadDetail';
import { ProductDetail } from '../screens/Shop/ProductDetails';
import { fadeInTransition } from '../utils/cardTransitionOptions';

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
  trail: undefined,
  readDetail: {
    readId: string
  },
  productDetail: {
    productId: string,
    cameFrom: mainScreens
  }
};

const Stack = createSharedElementStackNavigator<AppStackParamList>();



//screen name format "[FLOW]_[ROLE]_[meta]"
const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="tabs"
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="onboarding_interests_hive"
        component={InterestSelectionHive}
      />
      <Stack.Screen
        name="tabs"
        component={Tabs}
      />
      <Stack.Screen
          name="actionDetails"
          component={ActionDetails}
          options={{ detachPreviousScreen: false, ...fadeInTransition as any}}
      />
      <Stack.Screen
          name="collectionDetails"
          component={CollectionDetails} 
          options={{ detachPreviousScreen: false, ...fadeInTransition as any}}
      />
      <Stack.Screen
        name="trail"
        component={Trail}
        options={{...fadeInTransition as any}}
      />
      <Stack.Screen
        name="readDetail"
        component={ReadDetail}
        options={{...fadeInTransition as any}}
      />
      <Stack.Screen
        name="productDetail"
        component={ProductDetail}
        options={{ detachPreviousScreen: false,...fadeInTransition as any}}
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
