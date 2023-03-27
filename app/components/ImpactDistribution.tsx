import {View, Text, ViewStyle, TextStyle} from 'react-native'
import { designSystem, kauriColors } from '../theme'
import {translate as geti18n} from '../i18n';
import ImpactMinimal from '../svgs/ImpactIcons/impact.minimal.svg';
import ExpenseHigh from '../svgs/ImpactIcons/expense.high.svg';
import EffortMinimal from '../svgs/ImpactIcons/effort.minimal.svg';
import { FC, memo } from 'react';
import type { impacts } from '../mockdata';

export const ImpactDistribution:FC<{impactDist:impacts, style:'light'|'dark'}> = memo(({impactDist, style}) => {
    const impactMap = {
        impact: {
            minimal: <ImpactMinimal/>
        },
        expense: {
            high: <ExpenseHigh/>
        },
        effort:{
            minimal: <EffortMinimal/>
        }
    }
    const fontColor = style === 'dark'? kauriColors.primary.dark: kauriColors.primary.light
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <View style={[$impactIcon, {marginLeft: 0}]}>
                {impactMap.impact[impactDist?.impact]}
                <View style={{marginLeft: 8}}>
                    <Text style={[$impactIconText, {color: fontColor}]}>
                        {geti18n(`common.${impactDist?.impact}`)}
                    </Text>
                    <Text style={[$impactIconSubText, {color: fontColor}]}>
                        {geti18n('common.impact')}
                    </Text>
                </View>
            </View>
            <View style={[$impactIcon] }>
                {impactMap.expense[impactDist?.expense]}
                <View style={{marginLeft: 8}}>
                    <Text style={[$impactIconText, {color: fontColor}]}>
                        {geti18n(`common.${impactDist?.expense}`)}
                    </Text>
                    <Text style={[$impactIconSubText, {color: fontColor}]}>
                        {geti18n('common.expense')}
                    </Text>
                </View>
            </View>
            <View style={$impactIcon}>
                {impactMap.effort[impactDist?.effort]}
                <View style={{marginLeft: 8}}>
                    <Text style={[$impactIconText, {color: fontColor}]}>
                        {geti18n(`common.${impactDist?.effort}`)}
                    </Text>
                    <Text style={[$impactIconSubText, {color: fontColor}]}>
                        {geti18n('common.effort')}
                    </Text>
                </View>
            </View>
        </View>
    )
})

const $impactIcon:ViewStyle = {
    alignItems: 'center',
    marginHorizontal: 16,
    flexDirection: 'row'
}

const $impactIconText:TextStyle = {
    marginTop: 8,
    ...designSystem.textStyles.smallTextsBold,
}

const $impactIconSubText:TextStyle = {
    ...designSystem.textStyles.smallTextsSemi,
    textTransform: 'lowercase',
}