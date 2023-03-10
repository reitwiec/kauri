import {createRef, FC} from 'react';
import React from 'react';
import {View, ViewStyle} from 'react-native';
import {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsetsStyle} from '../utils/useSafeAreaInsetsStyle';
import {Chips, ChipSystem} from './ChipSystem';
import {CartIcon, CustomiseIcon, FilterIcon, SearchIcon} from '../svgs';
import {hexToRGBA} from '../utils/hexToRGBA';
import {kauriColors} from '../theme';
import Lottie from 'lottie-react-native';

type configOptions = 'customise' | 'filter' | 'search' | 'cart' | 'wishlist';

interface configSettings {
  right?: configOptions[];
  left?: configOptions[];
  height: 240 | number;
}

interface RiveHeaderProps {
  config?: configSettings;
  translationY: SharedValue<number>;
  data: Chips[];
  screenState: (key: string) => void;
}

interface OptionBtnProps {
  optionType: configOptions;
  left: boolean;
}

export const RiveHeader: FC<RiveHeaderProps> = React.memo(({
  translationY,
  data,
  config,
  screenState,
}) => {
  const $containerInsets = useSafeAreaInsetsStyle(['top'], 'padding');
  const headerRef = createRef<Animated.View>();
  const $animated_container = useAnimatedStyle(() => {
    // console.log(translationY.value)
    return {
      height: interpolate(
        translationY.value,
        [0, 100],
        [config?.height || 240, 200],
        Extrapolate.CLAMP,
      ),
    };
  }, [translationY]);

  const OptionBtn = ({optionType, left}: OptionBtnProps) => {
    let option: JSX.Element;
    switch (optionType) {
      case 'customise':
        option = <CustomiseIcon />;
        break;
      case 'filter':
        option = <FilterIcon />;
        break;
      case 'search':
        option = <SearchIcon />;
        break;
      case 'cart':
        option = <CartIcon />;
        break;
      case 'wishlist':
        option = <CustomiseIcon />;
        break;
    }

    return (
      <View
        style={[
          $optionBtn,
          left && {
            marginRight: 8,
          },
          !left && {
            marginLeft: 8,
          },
        ]}>
        {option}
      </View>
    );
  };

  return (
    <Animated.View style={[$container, $animated_container]} ref={headerRef}>
      <View style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        <Lottie
          source={require('./animation.json')}
          autoPlay
          speed={0.5}
          loop
          style={{position: 'absolute', height: 240}}
          />
      </View>
      <View style={{position: 'absolute', left: 0, bottom: 16, width: '100%'}}>
        <ChipSystem data={data} screenState={screenState} />
      </View>
      {config && config.right && (
        <View
          style={{
            position: 'absolute',
            top: $containerInsets.paddingTop,
            right: 16,
            flexDirection: 'row',
          }}>
          {config.right.map((option, i) => {
            return (
              config.right && (
                <OptionBtn
                  optionType={option}
                  key={`${option}_${i}`}
                  left={false}
                />
              )
            );
          })}
        </View>
      )}
      {config && config.left && (
        <View
          style={{
            position: 'absolute',
            top: $containerInsets.paddingTop,
            left: 16,
            flexDirection: 'row',
          }}>
          {config.left.map((option, i) => {
            return (
              config.left && (
                <OptionBtn
                  optionType={option}
                  key={`${option}_${i}`}
                  left={true}
                />
              )
            );
          })}
        </View>
      )}
    </Animated.View>
  );
});

const $container: ViewStyle = {
  width: '100%',
  backgroundColor: 'rgba(255,255,255,1)',
  position: 'absolute',
  left: 0,
  top: 0,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  overflow: 'hidden',
};

const $optionBtn: ViewStyle = {
  backgroundColor: hexToRGBA(kauriColors.primary.chipBar, 0.8),
  padding: 8,
  borderRadius: 50,
};
