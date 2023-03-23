import type { StackNavigationOptions } from "@react-navigation/stack"
import { Easing } from "react-native-reanimated"

export const options = ():StackNavigationOptions => ({
    headerBackTitleVisible: false,
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {duration:400, easing: Easing.inOut(Easing.ease)}
      },
      close: {
        animation: 'timing',
        config: {duration:400, easing: Easing.inOut(Easing.ease)}
      }
    },
    cardStyleInterpolator: ({current : {progress}}) => {
      return {
        cardStyle: {
          opacity: progress
        }
      }
    }
  
  })