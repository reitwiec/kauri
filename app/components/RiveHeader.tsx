import {createRef, FC, useRef, useState} from 'react';
import React from 'react';
import {Pressable, TextInput, useWindowDimensions, View, ViewStyle, Text} from 'react-native';
import {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsetsStyle} from '../utils/useSafeAreaInsetsStyle';
import {Chips, ChipSystem} from './ChipSystem';
import {CartIcon, CrossIcon, CustomiseIcon, FilterIcon, SearchIcon} from '../svgs';
import {hexToRGBA} from '../utils/hexToRGBA';
import {designSystem, kauriColors} from '../theme';
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
  isSearching: boolean;
  searchClicked: (override: any, searchPhrase: string) => void;
  updateSearchPhrase: (phrase: string) => void
  searchPhrase: string
}

interface OptionBtnProps {
  optionType: configOptions;
  left: boolean;
  searchClicked: (override: any, searchPhrase: string) => void,
  translationY: SharedValue<number>;
  updateSearchPhrase: (phrase: string) => void
  searchPhrase: string
}

const OptionBtn = ({optionType, left, searchClicked, translationY, updateSearchPhrase, searchPhrase}: OptionBtnProps) => {
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

  const {width: windowWidth} = useWindowDimensions()
  
  const [isSearching, setIsSearching] = useState(false)

  const textRef = useRef<any>()
  const $growAnim = useAnimatedStyle(()=>{
    return {
      marginLeft: isSearching?withTiming(8):withTiming(0),
      width: isSearching? withTiming(windowWidth-16-8-(8*2)-(24*2)-64): withTiming(0)
    }
  }, [isSearching])


  const toggleSearch = () => {
    if(textRef.current){
      const isFocused = textRef.current.isFocused()
      if(isFocused){
        textRef.current.blur()
      }else{
        textRef.current.focus()
      }
    }
    searchClicked(undefined, searchPhrase.trim())
    if(searchPhrase.length === 0){
      setIsSearching(prev => !prev)
    }
  }

  return (
    <Animated.View
      style={[
        $optionBtn,
        left && {
          marginRight: 8,
        },
        !left && {
          marginLeft: 8,
        },
        {flexDirection: 'row', alignItems: 'center'}
      ]}>
            <Pressable onPress={()=>{
              if(optionType=== 'search'){
                translationY.value =0
                toggleSearch()
              }
            }}>
              {option}
            </Pressable>
            {optionType === 'search' && <Animated.View style={[$growAnim]}><TextInput
              ref={textRef}
              style={{width: '100%', ...designSystem.textStyles.captionsBold, color: kauriColors.primary.dark}}
              placeholder={"Search for different actions..."}
              placeholderTextColor={kauriColors.primary.unselectedLight}
              autoFocus={false}
              value={searchPhrase}
              onChangeText={updateSearchPhrase}
              onBlur={() => {
                if (searchPhrase.trim().length === 0) {
                  updateSearchPhrase('');
                }
                searchClicked(false, searchPhrase)
                if(searchPhrase.length === 0){ 
                  setIsSearching(false)
                }
              }}
            />
            
            </Animated.View>}
            {isSearching && 
              <Pressable 
              onPress={()=>{
                updateSearchPhrase('')
                toggleSearch()
              }}
              style={{width:12}}>
                <CrossIcon color={kauriColors.primary.unselectedLight}/>
              </Pressable>
            }
    </Animated.View>
  );
};


export const RiveHeader: FC<RiveHeaderProps> = React.memo(({
  translationY,
  data,
  config,
  screenState,
  isSearching,
  searchClicked,
  updateSearchPhrase,
  searchPhrase
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
      {!isSearching && config && config.right && (
        <View
          style={{
            position: 'absolute',
            top: $containerInsets.paddingTop,
            right: 16,
            flexDirection: 'row',
            zIndex: 2
          }}>
          {config.right.map((option, i) => {
            return (
              config.right && (
                <OptionBtn
                  optionType={option}
                  key={`${option}_${i}`}
                  left={false}
                  searchClicked={searchClicked}
                  translationY={translationY}
                  updateSearchPhrase={updateSearchPhrase}
                  searchPhrase={searchPhrase}
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
            left: 0,
            paddingLeft: 16,
            paddingRight:16,
            flexDirection: 'row',
            width: '100%'
          }}>
          {config.left.map((option, i) => {
            return (
              config.left && (
                <OptionBtn
                  optionType={option}
                  key={`${option}_${i}`}
                  left={true}
                  searchClicked={searchClicked}
                  translationY={translationY}
                  updateSearchPhrase={updateSearchPhrase}
                  searchPhrase={searchPhrase}
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
