import {createRef, FC, memo, useRef, useState} from 'react';
import React from 'react';
import {Pressable, TextInput, useWindowDimensions, View, ViewStyle, Text, FlexStyle} from 'react-native';
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
import {Chips, ChipSystem, ChipSystemProps} from './ChipSystem';
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
}

interface OptionBtnProps {
  optionType: configOptions;
  left: boolean;
  searchClicked: (override: any, searchPhrase: string) => void,
  updateSearchPhrase: (phrase: string) => void
}

const OptionBtn = memo(({optionType, left, searchClicked, updateSearchPhrase}: OptionBtnProps) => {
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
    searchClicked(undefined, localSearchPhrase.trim())
    if(localSearchPhrase.length === 0){
      setIsSearching(prev => !prev)
    }
  }

  const [localSearchPhrase, setLocalSearchPhrase] = useState('') 

  const updateLocalSearchPhrase = (phrase:string) => {
    setLocalSearchPhrase(phrase)
    updateSearchPhrase(phrase)
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
                //translate main screen to top
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
              value={localSearchPhrase}
              onChangeText={updateLocalSearchPhrase}
              onBlur={() => {
                if (localSearchPhrase.trim().length === 0) {
                  updateLocalSearchPhrase('');
                }
                searchClicked(false, localSearchPhrase)
                if(localSearchPhrase.length === 0){ 
                  setIsSearching(false)
                }
              }}
            />
            
            </Animated.View>}
            {isSearching && 
              <Pressable 
              onPress={()=>{
                updateLocalSearchPhrase('')
                toggleSearch()
              }}
              style={{width:12}}>
                <CrossIcon color={kauriColors.primary.unselectedLight}/>
              </Pressable>
            }
    </Animated.View>
  );
});

const LottiePlayer = memo(() =>{
  return (
      <View style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        <Lottie
          source={require('./animation.json')}
          autoPlay
          speed={0.5}
          loop
          style={{position: 'absolute', height: 240}}
          />
      </View>
  )
})


const ChipPlayer = memo(({data, screenState}:ChipSystemProps)=>{
      return (
        <View style={{position: 'absolute', left: 0, bottom: 16, width: '100%'}}>
          <ChipSystem data={data} screenState={screenState} />
        </View>
      )
})


interface ConfigProps {
  $containerInsets: Pick<FlexStyle, "paddingTop" | "marginBottom" | "marginEnd" | "marginStart" | "marginTop" | "paddingBottom" | "paddingEnd" | "paddingStart">
  data:any
  searchClicked: (override: any, searchPhrase: string) => void
  updateSearchPhrase: (phrase: string) => void
}

const ConfigRight = memo(({$containerInsets, data, searchClicked, updateSearchPhrase}:ConfigProps) => {
  return (
        <View
          style={{
            position: 'absolute',
            top: $containerInsets.paddingTop,
            right: 16,
            flexDirection: 'row',
            zIndex: 2
          }}>
          {data.map((option, i) => {
            return (
                <OptionBtn
                  optionType={option}
                  key={i}
                  left={false}
                  searchClicked={searchClicked}
                  updateSearchPhrase={updateSearchPhrase}
                />
              )
          })}
        </View>
  )
})

const ConfigLeft = memo(({$containerInsets, data, searchClicked, updateSearchPhrase}:ConfigProps) => {
  return (
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
          {data.map((option, i) => {
            return (
                <OptionBtn
                  optionType={option}
                  key={`${option}_${i}`}
                  left={true}
                  searchClicked={searchClicked}
                  updateSearchPhrase={updateSearchPhrase}
                />
              )
          })}
    </View>
  )
})

export const RiveHeader: FC<RiveHeaderProps> = ({
  translationY,
  data,
  config,
  screenState,
  isSearching,
  searchClicked,
  updateSearchPhrase,
}) => {
  const $containerInsets = useSafeAreaInsetsStyle(['top'], 'padding');
  const headerRef = createRef<Animated.View>();
  const { height:winHeight} = useWindowDimensions()
  const minRiveHeight = 200*winHeight/844
  const $animated_container = useAnimatedStyle(() => {
    return {
      height: interpolate(
        translationY.value,
        [0, 200],
        [config?.height || 240, minRiveHeight],
        Extrapolate.CLAMP,
      ),
    };
  }, [translationY]);

  return (
    <Animated.View style={[$container, $animated_container]} ref={headerRef}>
      <LottiePlayer/>
      <ChipPlayer data={data} screenState={screenState}/>
      {!isSearching && config && config.right && (
        <ConfigRight
          $containerInsets={$containerInsets}
          data={config.right}
          searchClicked={searchClicked}
          updateSearchPhrase={updateSearchPhrase}
        />
      )}
      {config && config.left && (
        <ConfigLeft
          $containerInsets={$containerInsets}
          data={config.left}
          searchClicked={searchClicked}
          updateSearchPhrase={updateSearchPhrase} 
        />
      )}
    </Animated.View>
  );
};

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
