import {observer} from 'mobx-react-lite';
import type {FC} from 'react';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {designSystem, kauriColors} from '../theme';
import {translate as geti18n} from '../i18n';
import {hexToRGBA} from '../utils/hexToRGBA';
import {OptionsDotsIcon} from '../svgs';

export interface ThumbnailProps {
  src: ImageSourcePropType;
  width: number;
  height: number;
  title: string;
  type: 'small' | 'large';
  actionType: 'onetime' | 'habit';
  activeIndexVal: SharedValue<number> | null;
  index: number;
  pretty: boolean;
  stacked: boolean;
  status: 'uncompleted' | 'completed' | 'inProgress';
}

export const Thumbnail: FC<ThumbnailProps> = observer(function thumbnail({
  src,
  width,
  height,
  type,
  activeIndexVal,
  index,
  title,
  actionType,
  pretty,
  stacked,
  status,
}) {
  let {width: imageWidth, height: imageHeight} = Image.resolveAssetSource(src);
  const pressIn = useSharedValue(false);
  if (imageWidth > imageHeight) {
    imageWidth = (height / imageHeight) * imageWidth;
    imageHeight = height;
  } else {
    imageHeight = (width / imageWidth) * imageHeight;
    imageWidth = width;
  }
  const inputRange = [index - 1, index, index + 1];

  const animStyle = useAnimatedStyle(() => {
    if(!activeIndexVal){
      return {

      }
    }
    const absDifference = Math.abs(activeIndexVal.value - index);
    const delay = absDifference * 100;
    return {
      opacity: withDelay(
        delay,
        withTiming(interpolate(activeIndexVal.value, inputRange, [0, 1, 0]), {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
    };
  }, [activeIndexVal]);

  const _statusColorMap = {
    uncompleted: kauriColors.secondary.uncompleted,
    completed: kauriColors.secondary.completed,
    inProgress: kauriColors.secondary.inProgress,
  };
  const $statusConfig: ViewStyle = {
    borderRadius: 50,
    backgroundColor: hexToRGBA(_statusColorMap[status], 0.25),
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: actionType !== 'habit' ? 0 : 8,
  };

  const $statusTextConfig: TextStyle = {
    color: _statusColorMap[status],
    ...designSystem.textStyles.smallTexts,
  };

  const $pressInAnim = useAnimatedStyle(() => {
    return {
      transform: [{scale: pressIn.value ? withTiming(0.98) : withTiming(1)}]
    };
  }, [pressIn]);

  return (
    <Animated.View
      style={[
        {
          alignItems: stacked ? 'center' : 'flex-start',
          justifyContent: 'center',
        },
      ]}>
      {stacked && (
        <View
          style={{
            width: width,
            height: height,
            borderRadius: type === 'large' ? 16 : 12,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 3,
          }}>
          <Image
            source={src}
            style={{
              borderRadius: type === 'large' ? 16 : 12,
              flex: 1,
              width: imageWidth,
              height: imageHeight,
            }}
          />
          <View
            style={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.4)',
              position: 'absolute',
            }}
          />
          <LinearGradient
            style={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              flex: 1,
              position: 'absolute',
            }}
            start={{x: 0.5, y: 1}}
            end={{x: 0.5, y: 0}}
            colors={['rgba(92,58,36,0.75)', 'rgba(92,58,36,0)']}
          />
          <Text
            style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              ...designSystem.textStyles.smallSerif,
              width: '60%',
              color: '#ffffff',
              lineHeight: 10,
            }}>
            {title}
          </Text>
          {actionType === 'habit' && type === 'large' && (
            <View
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                borderRadius: 50,
                backgroundColor: hexToRGBA(kauriColors.primary.seaGreen, 0.8),
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}>
              <Text
                style={{
                  color: kauriColors.primary.light,
                  ...designSystem.textStyles.smallTexts,
                }}>
                {geti18n('common.habit')}
              </Text>
            </View>
          )}
        </View>
      )}
      {!stacked && (
        <Animated.View
          style={[
            {flexDirection: 'row', padding: 8, borderRadius: 12 },
            $pressInAnim,
          ]}>
          <Pressable
            style={{flexDirection: 'row'}}
            onPressIn={() => {
              pressIn.value = true;
            }}
            onPressOut={() => {
              pressIn.value = false;
            }}
            onPress={() => {
              console.log('pressed');
            }}>
            <View
              style={{
                width: width,
                height: height,
                borderRadius: type === 'large' ? 16 : 12,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
              <Image
                source={src}
                style={{
                  borderRadius: type === 'large' ? 16 : 12,
                  flex: 1,
                  width: imageWidth,
                  height: imageHeight,
                }}
              />
              <View
                style={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  position: 'absolute',
                }}
              />
              <LinearGradient
                style={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  flex: 1,
                  position: 'absolute',
                }}
                start={{x: 0.5, y: 1}}
                end={{x: 0.5, y: 0}}
                colors={['rgba(92,58,36,0.75)', 'rgba(92,58,36,0)']}
              />
              <Text
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  ...designSystem.textStyles.smallSerif,
                  width: '60%',
                  color: '#ffffff',
                  fontSize: 6,
                  lineHeight: 6,
                }}>
                {title}
              </Text>
            </View>
            <View style={{marginLeft: 16}}>
              <Text
                style={{
                  ...designSystem.textStyles.captionsBold,
                  marginBottom: 8,
                  color: hexToRGBA(kauriColors.primary.dark, 0.9),
                }}>
                {title}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                {actionType === 'habit' && (
                  <View
                    style={{
                      borderRadius: 50,
                      backgroundColor: hexToRGBA(
                        kauriColors.primary.seaGreen,
                        0.8,
                      ),
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}>
                    <Text
                      style={{
                        color: kauriColors.primary.light,
                        ...designSystem.textStyles.smallTexts,
                      }}>
                      {geti18n('common.habit')}
                    </Text>
                  </View>
                )}
                <View style={{...$statusConfig}}>
                  <Text style={{...$statusTextConfig}}>
                    {geti18n(`common.${status}`)}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <OptionsDotsIcon />
          </Pressable>
        </Animated.View>
      )}
      {pretty && (
        <Animated.View style={[animStyle, {zIndex: 2}]}>
          <LinearGradient
            style={{
              width: width + 8,
              height: height + 8,
              borderRadius: type === 'large' ? 16 : 12,
            }}
            start={{x: 1, y: 1}}
            end={{x: 0.5, y: 0}}
            colors={['rgba(92,58,36,0.8)', 'rgba(92,58,36, 0.25)']}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
});
