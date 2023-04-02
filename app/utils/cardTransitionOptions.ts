import type { StackNavigationOptions } from "@react-navigation/stack"
import { Easing } from "react-native-reanimated"

const springConfig = {damping: 15, mass: 1, stiffness: 200, overshootClamping: false, restDisplacementThreshold: 0.001, restSpeedThreshold: 0.001}

const springTransitionSpec =  {
  open: {
    animation: 'spring',
    config: springConfig
  },
  close: {
    animation: 'spring',
    config: springConfig
  }
}

const timingTransitionSpec = {
  open: {
    animation: 'timing',
    config: {duration:300, easing: Easing.inOut(Easing.ease)}
  },
  close: {
    animation: 'timing',
    config: {duration:300, easing: Easing.inOut(Easing.ease)}
  }
}
export const fadeInTransition = {
    headerBackTitleVisible: false,
    transitionSpec: timingTransitionSpec,
    cardStyleInterpolator: ({current : {progress}}) => {
      return {
        cardStyle: {
          opacity: progress
        }
      }
    }
  
  }

  export const horizontalTransition  = {
    gestureDirection: 'horizontal',
    transitionSpec: timingTransitionSpec,
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height, 0],
              }),
            },
          ],
        },
      };
    },
  };