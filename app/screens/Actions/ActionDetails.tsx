import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { observer } from 'mobx-react-lite'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import {Pressable, Text, TextStyle, TouchableOpacity, useWindowDimensions, View, ViewStyle} from 'react-native'
import { BusyIndicator, ChipSystem, Header, ImpactDistribution, StylisedTitle, Thumbnail } from '../../components'
import { actionDetail, getActionDetails, milestone } from '../../mockdata/actionDetails'
import type { AppStackParamList } from '../../navigators'
import { designSystem, kauriColors } from '../../theme'
import { hexToRGBA } from '../../utils/hexToRGBA'
import { useSafeAreaInsetsStyle } from '../../utils/useSafeAreaInsetsStyle'
import type { TabStackParamList } from '../Tabs/Tabs'
import {translate as geti18n} from '../../i18n';
import { InfoIcon, Lock, MindfulIcons } from '../../svgs'
import { Completion } from './Completion'
import { Hex } from '../../components/Hex'
import Animated, { Easing, Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'

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
        <View style={{marginVertical: 24}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{...designSystem.textStyles.captionsExtraBold , marginBottom:8, color: kauriColors.primary.dark, marginRight:4}}>
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
                <Text style={{padding:16, ...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.dark}}>
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
    const {height:windowHeight} = useWindowDimensions()
    const shake = useSharedValue(0)
    const shakeScale = useSharedValue(1)
    const rippleProgress = useSharedValue(0)

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
            setItem(getActionDetails(actionId))
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
        <View style={{...$container, paddingTop: $containerInsets.paddingTop}}>
            { busy?
                <BusyIndicator style='light'/>:
                <>
                    <Animated.ScrollView onScroll={scrollHandler} showsVerticalScrollIndicator={false} scrollEventThrottle={16} style={{paddingTop: 40}}>
                        
                        <View style={{paddingHorizontal: 16}}>
                            <View style={{flexDirection: 'row'}}>
                                <Thumbnail src={item.url} width={THUMBNAIL_WIDTH} height={THUMBNAIL_WIDTH} title={item.title} type={"large"} actionType={item.type} pretty={true} status={item.status} isNew={false}/>
                                <View style={{marginLeft: 16, justifyContent: 'flex-end'}}>
                                    <Text style={{...designSystem.textStyles.titleBig, color: kauriColors.primary.dark, width: '90%', marginBottom:16}}>
                                        {item.title}
                                    </Text>
                                    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                                        {item.type === 'habit' && (
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
                                            {geti18n(`common.${item.status}`)}
                                        </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <ImpactDistribution impactDist={item.impactDist} style={"dark"}/>
                            <View style={{marginTop: 16}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                                    <Text style={{...designSystem.textStyles.captionsExtraBold, color: kauriColors.primary.dark, marginRight:4}}>
                                        {geti18n("actions.causesImpactedHighest")}
                                    </Text>
                                    <TouchableOpacity activeOpacity={0.8}>
                                        <Text style={{ ...designSystem.textStyles.captionsBold, color: kauriColors.primary.yellow}}>
                                            See All
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row', flexWrap: 'wrap', width:'100%'}}>
                                    {
                                        item.topCauses.map((cause, index)=>{
                                            return(
                                                <View style={{flexBasis: '50%', paddingRight:index%2===0?8:0, paddingLeft:index%2===0?0:8, justifyContent: index%2===0?'flex-start':'flex-end'}} key={index}>
                                                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
                                                        <Hex dimension={cause.dimension} title={null}/>
                                                        <Text style={{width:'50%', ...designSystem.textStyles.smallTexts, marginLeft: 8, color: kauriColors.primary.dark, textAlign: 'center'}}>
                                                            {cause.note}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            <Milestones milestones={item.milestones} kauriUsersCompleted={item.kauriUsersCompleted}/>
                        </View>
                        <ChipSystem data={chipData} screenState={(key:any)=>{setPageState(key)}}/>
                        {pageState==='allDetails'?<View style={{paddingHorizontal: 16, marginTop: 24, minHeight: windowHeight/2}}>
                            <View>
                                <StylisedTitle text={geti18n("common.problemStatement")} alt={false} small/>
                                <Text style={{...designSystem.textStyles.paragraph,marginTop:16, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                                    {item.problemStatement}
                                </Text>
                            </View>
                            <View style={{marginTop:24}}>
                                <StylisedTitle text={geti18n("common.solution")} alt={false} small/>
                                <Text style={{...designSystem.textStyles.paragraph,marginTop:16, color: hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                                    {item.solution}
                                </Text>
                            </View>
                        </View>:<View style={{paddingHorizontal: 16, marginTop: 24, minHeight: windowHeight/2, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{...designSystem.textStyles.titleSmall, color:hexToRGBA(kauriColors.primary.dark, 0.7)}}>
                                {geti18n('actions.historyTitle')}
                            </Text>
                            <Text style={{...designSystem.textStyles.captionsBold, color: kauriColors.primary.unselectedLight}}>
                                {geti18n('actions.noHistory')}
                            </Text>
                        </View>}
                        <View style={{width: '100%', height:150}}/>
                    </Animated.ScrollView>

                    {/* <Animated.View style={[{width: 50, height: 50, borderRadius:50, backgroundColor: kauriColors.secondary.completed, position: 'absolute', bottom: typeof $containerInsets.paddingBottom ==='number'?  $containerInsets.paddingBottom + 8:  $containerInsets.paddingBottom, alignSelf: 'center', transform: [{scale:2}]}, $rippleAnim]}/> */}
                    <Animated.View style={{transform:[{translateX: shake}, {scale: shakeScale}], marginBottom: 8}}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPressIn={()=>{
                                shakeScale.value = withTiming(0.98)
                            }}
                            onPress={()=>{
                                _props.navigation.push('collectionDetails', {collectionId: '1', cameFrom: 'home'})
                            }}
                        >
                            <LinearGradient colors={["#9ABB9C", kauriColors.secondary.completed]} style={[{
                                    marginBottom: $containerInsets.paddingBottom,
                                    paddingHorizontal: 16,
                                    paddingVertical: 8,
                                    borderRadius: 100,
                                    // paddingTop: $containerInsets.paddingBottom && typeof $containerInsets.paddingBottom === 'number'?($containerInsets.paddingBottom)/2:24, 
                            }, $bottomActionBar]}>
                                <MindfulIcons type='flower' color={kauriColors.primary.light}/>
                                <Text style={{
                                    ...designSystem.textStyles.captionsExtraBold,
                                    color: kauriColors.primary.light,
                                    width: '100%',
                                    textAlign: 'center',
                                }}>
                                    {geti18n('actions.startHabit')}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                    <Header backTitle={geti18n(`common.${cameFrom}`)} onBackPress={()=>_props.navigation.goBack()} title={`${item.title}(${item.kauriUsersCompleted} ${geti18n('common.completed').toLowerCase()})`} translationY={translationY}/>
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