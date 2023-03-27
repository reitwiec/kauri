import {createRef, FC, memo, useRef, useState} from 'react';
import React from 'react';
import {Pressable, TextInput, useWindowDimensions, View, ViewStyle, Text, FlexStyle, Image} from 'react-native';
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
  updateSearchPhrase: (phrase: string) => void,
  lottiePlayerDisabled?: boolean;
  short?:boolean,
  ImagePlayer?: React.ElementType
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
      width: isSearching? withTiming(windowWidth-16-8-(8*2)-(24*2)-64, {duration: 100}): withTiming(0),
      opacity: isSearching? withTiming(1): withTiming(0),
      height: 22
    }
  }, [isSearching])



  const toggleSearch = () => {
    searchClicked(undefined, localSearchPhrase.trim())
    if(localSearchPhrase.length === 0){
      setIsSearching(prev => !prev)
    }
    if(textRef.current){
      const isFocused = textRef.current.isFocused()
      if(isFocused){
        textRef.current.blur()
      }else{
        setTimeout(()=>{
          textRef.current.focus()
        }, 300)
      }
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
            {optionType === 'search' && <Animated.View style={[$growAnim, {justifyContent: 'center'}]}><TextInput
              ref={textRef}
              style={{width: '100%', ...designSystem.textStyles.captionsBold, color: kauriColors.primary.dark, padding:0, alignItems: 'center', justifyContent: 'center'}}
              placeholder={"Search for different actions..."}
              placeholderTextColor={kauriColors.primary.dark}
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
              hitSlop={30}
              onPress={()=>{
                updateLocalSearchPhrase('')
                toggleSearch()
              }}
              style={{width:12}}>
                <CrossIcon color={kauriColors.primary.dark}/>
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
            top: $containerInsets.paddingTop?$containerInsets.paddingTop:16,
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
            top: $containerInsets.paddingTop?$containerInsets.paddingTop:16,
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
  lottiePlayerDisabled,
  short,
  ImagePlayer
}) => {
  if(lottiePlayerDisabled === undefined){
    lottiePlayerDisabled = false
  }
  if(short === undefined){
    short = false
  }
  const $containerInsets = useSafeAreaInsetsStyle(['top'], 'padding');
  const headerRef = createRef<Animated.View>();
  const { height:winHeight, width: winWidth} = useWindowDimensions()
  const minRiveHeight = short? $containerInsets.paddingTop?150:120 : 200*winHeight/844
  const $animated_container = useAnimatedStyle(() => {
    // console.log("=>",translationY.value)
    const height = interpolate(
      translationY.value,
      [0, short?(config?.height || (winWidth +48))+100: 240],
      [config?.height || 240, minRiveHeight],
      Extrapolate.CLAMP,
    )
    return {
      height: height,
    };
  }, [translationY]);

  return (
    <Animated.View style={[$container, $animated_container]} ref={headerRef}>
      {/* {!lottiePlayerDisabled && <LottiePlayer/>} */}
      {ImagePlayer && <ImagePlayer translationY={translationY}/>}
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
  backgroundColor: hexToRGBA(kauriColors.primary.chipBar, 0.5),
  padding: 8,
  borderRadius: 50,
};
