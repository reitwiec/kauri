import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { observer } from 'mobx-react-lite'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import {Pressable, Text, TextStyle, TouchableOpacity, useWindowDimensions, View, ViewStyle, Image, ScrollView} from 'react-native'
import { BusyIndicator, ChipSystem, Header, ImpactDistribution, LineSeparator, StylisedTitle, Thumbnail, TryBtn } from '../../components'
import { actionDetail, getActionDetails, milestone } from '../../mockdata/actionDetails'
import type { AppStackParamList } from '../../navigators'
import { designSystem, kauriColors, kauriTypography } from '../../theme'
import { hexToRGBA } from '../../utils/hexToRGBA'
import { useSafeAreaInsetsStyle } from '../../utils/useSafeAreaInsetsStyle'
import type { TabStackParamList } from '../Tabs/Tabs'
import {translate as geti18n} from '../../i18n';
import { InfoIcon, Lock, MindfulIcons } from '../../svgs'
import { Completion } from './Completion'
import { Hex } from '../../components/Hex'
import Animated, { Easing, Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'

type ActionDetailsProps = CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, 'actionDetails'>,
    BottomTabScreenProps<TabStackParamList>
>

export const Milestones:FC<{milestones: milestone[], kauriUsersCompleted: number}> = memo(({milestones, kauriUsersCompleted}) =>{
    const [selected, setSelected] = useState(0)
    useEffect(()=>{
        let startIndex = -1
        milestones.forEach((milestone, index) => {
            if(milestone.targetValue<kauriUsersCompleted){
                startIndex=index
            }
        })
        if(startIndex+1>milestones.length){
            setSelected(startIndex)
        }else{
            setSelected(startIndex+1)
        }
    },[])
    return (
        <View>
            <View style={{flexDirection: 'row', paddingHorizontal: 16,  alignItems: 'center', marginBottom: 8}}>
                <Text style={{...designSystem.textStyles.titleSans , color: kauriColors.primary.dark, marginRight:4}}>
                    {geti18n("common.kauriUsersContribution")}
                </Text>
                <InfoIcon color={kauriColors.primary.dark}/>
            </View>
            <View style={{marginTop: 8}}>
                <View style={{paddingHorizontal:16}}>
                    <View style={{flexDirection: 'row'}}>
                        {
                            milestones.map((milestone, index) => {
                                const locked = milestone.targetValue>kauriUsersCompleted 
                                return (
                                    <TouchableOpacity 
                                        activeOpacity={0.9} 
                                        style={{marginLeft: index===0?0:8, marginRight:8, alignItems: 'center'}}
                                        onPress={()=>{
                                            setSelected(index)
                                        }}
                                        key={index}
                                    >
                                        <Text style={{...designSystem.textStyles.captionsExtraBold, marginBottom:4, color: selected!==index?kauriColors.primary.unselectedLight:kauriColors.primary.dark}}>
                                            {milestone.targetValue/1000}k
                                        </Text>
                                        <View style={[{padding: 8, backgroundColor: selected===index?kauriColors.primary.yellow:locked?kauriColors.primary.chipBar:kauriColors.primary.yelllow_disabled, borderRadius:50,borderColor: selected===index?"#F2B50D":locked?kauriColors.primary.chipBar:kauriColors.primary.yelllow_disabled, borderWidth:1}]}>
                                            <Lock locked={locked}/>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <Completion completed={kauriUsersCompleted}  total={milestones[selected]!.targetValue}/>
                <Text style={{paddingHorizontal:16, paddingTop:8, ...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.dark}}>
                        {milestones[selected]!.title}
                </Text>
            </View>
        </View>
    )
})

export const ActionDetails:FC<ActionDetailsProps> = observer((_props) =>{
    const THUMBNAIL_WIDTH = 136
    const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom"]);
    const {actionId, cameFrom} = _props.route.params
    const [pageState, setPageState] = useState<'allDetails'|'history'>('allDetails')
    const [busy, setBusy] = useState(true)
    const {height:windowHeight, width:windowWidth} = useWindowDimensions()
    const shake = useSharedValue(0)
    const shakeScale = useSharedValue(1)
    const rippleProgress = useSharedValue(0)
    const [desiredImageHeight, setDesiredImageHeight] = useState(0)
    const [desiredImageWidth, setDesiredImageWidth] = useState(0)

    const [item, setItem] = useState<actionDetail>({
        id: -1,
        url: 0,
        title: '',
        type: "habit",
        totalCauses: 0,
        topCauses: [],
        causes: [],
        problemStatement: '',
        solution: '',
        status: 'completed',
        impactDist: {effort: 'high', expense: 'high', impact: 'high'},
        milestones: [],
        timesCompleted: 0,
        kauriUsersCompleted: 0
    })

    const $rippleAnim = useAnimatedStyle(()=>{
        return {
            opacity: interpolate(rippleProgress.value, [0, 0.5, 1], [0, 0.7, 0], Extrapolate.CLAMP),
            transform: [
                {scale: interpolate(rippleProgress.value, [0, 1], [1, 3])}
            ]
        }
    }, [rippleProgress])

    useEffect(() => {
        setTimeout(()=>{
            const fetchedItem =  getActionDetails(actionId)
            setItem(fetchedItem)
            let {width: imageWidth, height: imageHeight} = Image.resolveAssetSource(fetchedItem.url);
            const desiredImgHeight = windowWidth
            setDesiredImageHeight(desiredImgHeight)
            const desiredImgWidth = (desiredImgHeight/imageHeight) * imageWidth
            setDesiredImageWidth(desiredImgWidth)
            setBusy(false)
            shake.value = withDelay(250, withRepeat(withSequence(
                    withTiming(
                        -2,
                        {
                            duration:50,
                        }
                    ),
                    withTiming(
                        2,
                        {
                            duration:50,

                        }
                    ),
                    withTiming(
                        0,
                        {
                            duration:50,
                        }
                    ),
            ), 2))

            shakeScale.value = withDelay(0, withSequence(
                withTiming(
                    0.9,
                    {   
                        duration:200,
                        easing: Easing.bounce,
                    }
                ),
                withTiming(
                    1.1,
                    {   
                        duration:300,
                        easing: Easing.bounce,
                    }
                ),
                withTiming(
                    1,
                    {
                        duration:400,
                        easing: Easing.inOut(Easing.ease)
                    }
                ),
            ),)

        }, 600)

    }, [])
    
    const _statusColorMap = {
        uncompleted: kauriColors.secondary.uncompleted,
        completed: kauriColors.secondary.completed,
        inProgress: kauriColors.secondary.inProgress,
    };
    const $statusConfig: ViewStyle = {
        borderRadius: 50,
        backgroundColor: hexToRGBA(_statusColorMap[item.status], 0.25),
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: item.type !== 'habit' ? 0 : 8,
    };

    const $statusTextConfig: TextStyle = {
        color: _statusColorMap[item.status],
        ...designSystem.textStyles.smallTexts,
    };

    const chipData = [
        {
            id: 1,
            title: 'All Details',
            to: 'allDetails'
        },
        {
            id: 2,
            title: 'History',
            to: 'history'
        }
    ]
    const translationY = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event)=>{
            translationY.value = event.contentOffset.y
        }
    })



    return (
        <View style={{...$container}}>
            { busy?
                <BusyIndicator style='light'/>:
                <>
                    <Animated.ScrollView bounces={false} onScroll={scrollHandler} showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                        
                        <View style={{width: desiredImageHeight,overflow:"hidden", height: desiredImageHeight}}>
                            <FastImage
                                source={item.url as any}
                                style={{
                                    flex: 1,
                                    width: desiredImageWidth,
                                    height: desiredImageHeight,
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
                            <LinearGradient
                                    style={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                    flex: 1,
                                    position: 'absolute',
                                    }}
                                    locations={[0, 0.7, 1]}
                                    start={{x: 0.5, y: 0.7}}
                                    end={{x: 0.5, y: 0}}
                                    colors={['rgba(37,23,12,0.64)', 'rgba(37,23,12,0.14)', 'rgba(37,23,12,0)']}
                            />
                            <View style={{position: 'absolute', bottom: 24, paddingHorizontal: 16}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'flex-start',alignItems: 'center', marginBottom:8}}>
                                        {item.type === 'habit'&& (
                                            <View
                                            style={{
                                                borderRadius: 50,
                                                backgroundColor: hexToRGBA(kauriColors.primary.seaGreen, 0.8),
                                                paddingHorizontal: 8,
                                                paddingVertical: 4,
                                                alignItems: 'center',
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
                                            {geti18n(`common.${item.status}`)}
                                        </Text>
                                        </View>
                                    </View>
                                    <View style={{alignItems: 'flex-start'}}>
                                        <Text style={{...designSystem.textStyles.titleBig, color: kauriColors.primary.light, marginBottom: 16}}>
                                            {item.title}
                                        </Text>
                                            <ImpactDistribution impactDist={item.impactDist} style={"light"}/>
                                            <Animated.View style={{transform:[{translateX: shake}, {scale: shakeScale}]}}>
                                                <TouchableOpacity
                                                    style={{
                                                        marginTop:16,
                                                        alignItems: 'center',
                                                        paddingVertical: 12,
                                                        paddingHorizontal: 16,
                                                        borderRadius: 10,
                                                        backgroundColor: kauriColors.secondary.completed,
                                                        flexDirection: 'row',
                                                        justifyContent: 'center'
                                                    }}
                                                    activeOpacity={0.9}
                                                    onPressIn={()=>{
                                                        shakeScale.value = withTiming(0.98)
                                                    }}
                                                    onPress={()=>{
                                                        _props.navigation.push('collectionDetails', {collectionId: '1', cameFrom: 'home'})
                                                    }}
                                                >
                                                    <MindfulIcons type='flower' color={kauriColors.primary.light}/>
                                                        <Text style={{color: kauriColors.primary.light, ...designSystem.textStyles.captionsExtraBold, marginLeft: 8}}>
                                                            {geti18n('actions.startHabit')}
                                                        </Text>
                                                </TouchableOpacity>
                                            </Animated.View>
                                </View>
                            </View>
                        </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, marginTop: 16, paddingHorizontal:16}}>
                                <Text style={{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}}>
                                    {geti18n("actions.causesImpactedHighest")}
                                </Text>
                                {/* <TouchableOpacity activeOpacity={0.8}>
                                    <Text style={{ ...designSystem.textStyles.captionsBold, color: kauriColors.primary.yellow}}>
                                        See All
                                    </Text>
                                </TouchableOpacity> */}
                            </View>
                            <ScrollView horizontal style={{marginTop:8}} showsHorizontalScrollIndicator={false}>
                                {
                                    item.topCauses.map((cause, index)=>{
                                        return(
                                            <TouchableOpacity style={{width:112}} key={index} activeOpacity={0.9}>
                                                <View style={{ alignItems: 'center'}}>

                                                    <Hex dimension={cause.dimension} title={cause.subdimension} titleVisible={!cause.note}/>
                                                    {cause.note && <Text style={{marginTop:0, width:'90%', ...designSystem.textStyles.smallTexts, marginLeft: 8, color: kauriColors.primary.dark, textAlign: 'center'}}>
                                                        {cause.note}
                                                    </Text>}
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        <LineSeparator/>
                        <Milestones milestones={item.milestones} kauriUsersCompleted={item.kauriUsersCompleted}/>
                        <LineSeparator/>
                        <ChipSystem data={chipData} screenState={(key:any)=>{setPageState(key)}}/>
                        {pageState==='allDetails'?<View style={{paddingHorizontal: 16, marginTop: 24, minHeight: windowHeight/2}}>
                            <View>
                                <Text style={[{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}]}>
                                    {geti18n("common.problemStatement")}
                                </Text>
                                <Text style={{...designSystem.textStyles.paragraph,marginTop:8, color: hexToRGBA(kauriColors.primary.dark, 0.7), fontSize: 16}}>
                                    {item.problemStatement}
                                </Text>
                            </View>
                            <View style={{marginTop:24}}>
                                <Text style={[{...designSystem.textStyles.titleSans, color: kauriColors.primary.dark}]}>
                                        {geti18n("common.solution")}
                                </Text>
                                <Text style={{...designSystem.textStyles.paragraph,marginTop:8, color: hexToRGBA(kauriColors.primary.dark, 0.7), fontSize: 16}}>
                                    {item.solution}
                                </Text>
                            </View>
                        </View>:<View style={{paddingHorizontal: 16, marginTop: 24, minHeight: windowHeight/2, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{...designSystem.textStyles.titleSans, color:hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                                {geti18n('actions.historyTitle')}
                            </Text>
                            <Text style={{...designSystem.textStyles.captionsBold, color: kauriColors.primary.unselectedLight}}>
                                {geti18n('actions.noHistory')}
                            </Text>
                        </View>}
                        <View style={{width: '100%', height:50}}/>
                    </Animated.ScrollView>
                    <Header style={'light'} backTitle={geti18n(`common.${cameFrom}`)} onBackPress={()=>_props.navigation.goBack()} title={`${item.title}(${item.kauriUsersCompleted} ${geti18n('common.completed').toLowerCase()})`} translationY={translationY}/>
                </>
                }
        </View>
    )
})

const $container:ViewStyle ={
    backgroundColor:"#fff",
    flex: 1,
}

const $bottomActionBar:ViewStyle = {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor: kauriColors.secondary.completed
}