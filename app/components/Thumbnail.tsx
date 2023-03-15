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
  type: 'small' | 'large' | 'compact';
  actionType: 'onetime' | 'habit';
  activeIndexVal: SharedValue<number> | null;
  index: number;
  pretty: boolean;
  stacked: boolean;
  status: 'uncompleted' | 'completed' | 'inProgress';
  isNew?: boolean
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
  isNew
}) {
  let {width: imageWidth, height: imageHeight} = Image.resolveAssetSource(src);
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




  return (
    <Animated.View
      style={[
        {
          alignItems: stacked ? 'center' : 'flex-start',
          justifyContent: 'center',
          padding: !stacked && pretty? 4:0
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
            <View
              style={{
                width: width,
                height: height,
                borderRadius: type === 'large' ? 16 : type === 'compact'? 10 : 12,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
              <Image
                source={src}
                style={{
                  borderRadius: type === 'large' ? 16 : type === 'compact'? 10 : 12,
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
                style={[{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  ...designSystem.textStyles.smallSerif,
                  width: '60%',
                  color: '#ffffff',
                  lineHeight: 10,
                }, type==='compact' && {fontSize: 4, lineHeight: 4}, type === 'small' && {fontSize:6, lineHeight: 6}]}>
                {title}
              </Text>
              <View style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    flexDirection: 'row'
                    }}>

                {actionType === 'habit' && type === 'large' && (
                  <View
                    style={{
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
                {isNew && type === 'large' && (
                  <View
                    style={{
                      borderRadius: 50,
                      backgroundColor: hexToRGBA(kauriColors.primary.yellow, 0.8),
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      marginLeft: 4
                    }}>
                    <Text
                      style={{
                        color: kauriColors.primary.light,
                        ...designSystem.textStyles.smallTexts,
                      }}>
                      {geti18n('common.new')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
      )}
      {pretty && (
        <Animated.View style={[animStyle, {zIndex: !stacked?-1:2, position: !stacked?'absolute':'relative', top:0}]}>
          <LinearGradient
            style={{
              width: width + 8,
              height: height + 8,
              borderRadius: type === 'large' ? 16 : 12,
            }}
            start={{x: 1, y: 1}}
            end={{x: 0.5, y: 0}}
            colors={['rgba(92,58,36,0.8)', kauriColors.primary.yellow,  'rgba(92,58,36, 0.25)']}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
});
