import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {translate as geti18n} from '../i18n';
import {observer} from 'mobx-react-lite';
import type {FC} from 'react';
import React from 'react';
import {
  Pressable,
  Text,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsetsStyle} from '../utils/useSafeAreaInsetsStyle';
import {ActionsIcon, HomeIcon, ReadIcon, ShopIcon, AssistantIcon, YouIcon} from '../svgs';
import {designSystem, kauriColors} from '../theme';
import {hexToRGBA} from '../utils/hexToRGBA';

interface tabIconSelectorProps {
  route: string;
  active: boolean;
}

const TabIconSelector = ({route, active}: tabIconSelectorProps) => {
  const map = {
    home: <HomeIcon active={active} />,
    actions: <ActionsIcon active={active} />,
    shop: <ShopIcon active={active} />,
    read: <ReadIcon active={active} />,
    you: <YouIcon active={active} />,
  };
  return map[route];
};

export const BottomTab: FC<BottomTabBarProps> = observer(function BottomTab({
  state,
  navigation,
}: BottomTabBarProps) {
  const windowWidth = useWindowDimensions().width;
  const SEGMENT = windowWidth / state.routeNames.length;
  const $containerInsets = useSafeAreaInsetsStyle(['bottom']);
  return (
    <View
      style={[
        $container,
        { height: $containerInsets.paddingBottom? 56 + Number($containerInsets.paddingBottom): 56 + 16,
          paddingBottom: $containerInsets.paddingBottom?$containerInsets.paddingBottom:16
        },
        ,
      ]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const handlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const title: any = `common.${route.name}`;

        return (
          <Pressable
            key={index}
            onPress={handlePress}
            style={{
              width: SEGMENT,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {
                route.name === 'assistant'?
                <>
                  <AssistantIcon active={isFocused}/>
                </>:
                <>
                  <TabIconSelector route={route.name} active={isFocused} />
                  <Text style={isFocused ? $title_selected : $title_unselected}>
                    {geti18n(title)}
                  </Text>
                </>
              }
          </Pressable>
        );
      })}
    </View>
  );
});

const $container: ViewStyle = {
  flexDirection: 'row',
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'rgba(255,255,255,1)',
  alignItems: 'flex-end',
  justifyContent: 'center',
};

const $title_unselected: TextStyle = {
  ...designSystem.textStyles.smallTexts,
  color: hexToRGBA(kauriColors.primary.dark, 0.4),
  paddingTop: 8,
};

const $title_selected: TextStyle = {
  ...designSystem.textStyles.smallTextsBold,
  color: hexToRGBA(kauriColors.primary.dark, 0.8),
  paddingTop: 8,
};
