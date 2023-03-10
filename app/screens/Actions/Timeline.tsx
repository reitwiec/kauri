"use strict";

import {
  Pressable,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import React, { useCallback, useState } from "react";
import { PlaylistListItem } from "../../components";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { kauriColors } from "../../theme";
import { hexToRGBA } from "../../utils/hexToRGBA";
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";

const defaultCircleSize = 12;
const defaultCircleColor = kauriColors.primary.chipBar;
const defaultLineWidth = 2;
const defaultLineColor = hexToRGBA(kauriColors.primary.chipBar, 0.6);
const defaultDotColor = "white";

export const Timeline = ({data, Header, translationY, disableTimeline}) => {
  data = [{title: "dummy"}].concat(data)
  data = data.concat([{title: 'empty'}])
    const [x, setX] = useState(0)
    const updateX = (val) =>{
        setX(val)
    }
    const _renderItem = useCallback(({ item, index }) =>{
    let content = (
      <View style={[$rowContainer]}> 
        {_renderEvent(item, index)}
        {!disableTimeline && _renderCircle()}
      </View>
    );
    if(item.title === 'empty'){
      return (
        <View style={{width: '100%', height: 50}}/>
      )
    }
    if(index === 0 ){
      
      return(<Header/>)
    }
    return <View key={index}>{content}</View>;
  },[])
  const _renderEvent = (rowData, rowID) => {
    const opStyle = {
          borderColor: disableTimeline? kauriColors.primary.light: defaultLineColor,
          borderLeftWidth: disableTimeline?0: defaultLineWidth,
          borderRightWidth: 0,
          marginLeft: 0,

          paddingLeft: disableTimeline? 0: 16,
        };

    return (
      <View
        style={[
          $details,
          opStyle,
        ]}
        onLayout={(evt)=>{
            if(x===0){
                updateX(evt.nativeEvent.layout.x)
            }
        }}
      >
        <Pressable>
          <View style={[{paddingTop: disableTimeline?0: 0, paddingBottom: disableTimeline?0:32}]}>
            {_renderDetail(rowData, rowID)}
          </View>
        </Pressable>
      </View>
    );
  }

  const _renderDetail =(rowData, rowID) => {

    return (
        <PlaylistListItem url={rowData.url} title={rowData.title} index={rowID} status={rowData.status} type={rowData.type}/>
    );
  }

  const _renderCircle = () => {
    var circleSize = defaultCircleSize;
    var circleColor = defaultCircleColor;
    var lineWidth = defaultLineWidth;

    let circleStyle:ViewStyle =  {
              width:  circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: circleColor,
              left: x + (lineWidth - 1) / 2,
            };
    const dotSize =  circleSize / 2;
    let dotStyle = {
        height: dotSize,
        width: dotSize,
        borderRadius: circleSize / 4,
        backgroundColor:  defaultDotColor,
    };
    let innerCircle = <View style={[$dot, dotStyle]} />;
    return (
      <View style={[$circle, circleStyle]}>
        {innerCircle}
      </View>
    );
  }

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event)=>{
            translationY.value = event.contentOffset.y
        }
    })

  const windowHeight = useWindowDimensions().height
  const $containerInsets = useSafeAreaInsetsStyle(['bottom', 'top']);
  return (
    <View>
      <Animated.FlatList
            data={data}
            maxToRenderPerBatch={10}
            bounces={false}
            renderItem={_renderItem}
            style={{ height:windowHeight-80-(56 + Number($containerInsets.paddingBottom))}}
            keyExtractor={(item, index) => index + ""}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
          />
    </View>
  );
}

  const $rowContainer:ViewStyle = {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  }

  const $circle:ViewStyle = {
    width: 16,
    height: 16,
    borderRadius: 10,
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  }

  const $dot:ViewStyle = {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: defaultDotColor,
  }

  const $details:ViewStyle =  {
    borderLeftWidth: defaultLineWidth,
    flexDirection: "column",
    flex: 1,
  }