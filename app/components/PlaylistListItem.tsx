import type { FC } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Thumbnail } from "./Thumbnail";
import {View, Text, Pressable, ImageSourcePropType, TextStyle, ViewStyle} from 'react-native';
import { designSystem, kauriColors } from "../theme";
import { hexToRGBA } from "../utils/hexToRGBA";
import { OptionsDotsIcon } from "../svgs";
import {translate as geti18n} from '../i18n';

interface PlaylistListItemProps {
    url: ImageSourcePropType,
    title: string,
    status: 'uncompleted' | 'completed' | 'inProgress',
    type: 'onetime' | 'habit',
    index: number
}

export const PlaylistListItem:FC<PlaylistListItemProps> = ({url, title, status, type, index}) =>{
    const pressIn = useSharedValue(false)
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
        marginLeft: type !== 'habit' ? 0 : 8,
    };

    const $statusTextConfig: TextStyle = {
        color: _statusColorMap[status],
        ...designSystem.textStyles.smallTexts,
    };

    const $animatedStyles = {
        pressIn: useAnimatedStyle(()=>{
            return {
                backgroundColor: pressIn.value?kauriColors.primary.light: 'transparent',
                opacity: pressIn.value?withTiming(0.9): withTiming(1),
                transform: [
                    {scale: pressIn.value? withTiming(0.98): withTiming(1)}
                ]
            }
        }, [pressIn])
    }
    return (
        <Animated.View
          style={[
            {flexDirection: 'row', alignItems: 'center', paddingLeft: 8},
            $animatedStyles.pressIn,
          ]}>
            <View style={$orderIndexContainer}><Text style={$orderIndex}>
            {index}
            </Text></View>
          <Pressable
            onPressIn={() => {
              pressIn.value = true;
            }}
            onPressOut={() => {
              pressIn.value = false;
            }}
            onPress={() => {
              console.log('pressed');
            }}> 
            <Thumbnail src={url} width={56} height={56} title={title} type={"compact"} pretty={false} actionType={type} index={index} activeIndexVal={null} stacked={false} status={status}/>
        </Pressable>
        <View style={{flexDirection: 'row', marginLeft: 16, flex:1, paddingVertical: 16, paddingRight:16, borderColor: kauriColors.primary.light,
                    borderBottomWidth: 1.25}}>
            <Pressable 
                onPressIn={() => {
                    pressIn.value = true;
                }}
                onPressOut={() => {
                    pressIn.value = false;
                }}
                onPress={() => {
                    console.log('pressed');
                }}
                style={{
                        justifyContent: 'center',
                        flex:1
                    }}
                >
                <Text
                    style={{
                    ...designSystem.textStyles.smallTextsSemi,
                    marginBottom: 8,
                    color: hexToRGBA(kauriColors.primary.dark, 0.9),
                    }}>
                    {title}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    {type === 'habit' && (
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
            </Pressable>
          <Pressable
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <OptionsDotsIcon />
          </Pressable>
        </View>
        </Animated.View>
    )
}

  const $orderIndex:TextStyle = {
    ...designSystem.textStyles.smallTextsSemi,
    color: kauriColors.primary.unselectedLight
  }

  const $orderIndexContainer:TextStyle = {
    alignItems: 'center',
    justifyContent:'center',
    // backgroundColor: hexToRGBA(kauriColors.primary.chipBar, 0.25),
    borderRadius: 50,
    width:24,
    height:24,
    marginRight: 8
  }