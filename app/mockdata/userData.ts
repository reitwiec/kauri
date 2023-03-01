export const userDataSummary = {
    name: "Reitwiec",
    actionsCompleted: 108,
    totalActions: 2000,
    totalSubdimensions: 55,
    subdimensionsImpacted: 10,
    totalContributions: 437,
    contributionsPerDimension: [
        {dimension: "dimension1", value: 37,},
        {dimension: "dimension2", value: 86,},
        {dimension: "dimension3", value: 52,},
        {dimension: "dimension4", value: 21,},
        {dimension: "dimension5", value: 36,},
        {dimension: "dimension6", value: 205,},
    ],
    subdimensionDistribution: [
        {
            dimension: "dimension1",
            subdimension: "subdimension_1",
            count: 2
        } ,
        {
            dimension: "dimension2",
            subdimension: "subdimension_2",
            count: 1
        },
        {
            dimension: "dimension3",
            subdimension: "subdimension_3",
            count: 17
        },
        {
            dimension: "dimension4",
            subdimension: "subdimension_4",
            count: 3
        },
        {
            dimension: "dimension1",
            subdimension: "subdimension_5",
            count: 2
        },
        {
            dimension: "dimension2",
            subdimension: "subdimension_6",
            count: 2
        },
        {
            dimension: "dimension6",
            subdimension:  "subdimension_7",
            count: 3
        },
        {
            dimension: "dimension3",
            subdimension: "subdimension_8",
            count: 2
        },
        {
            dimension: "dimension3",
            subdimension: "subdimension_9",
            count: 1,
        },
        {
            dimension: "dimension5",
            subdimension: "subdimension_10",
            count: 1
        },
        {
            dimension: "dimension5",
            subdimension: "subdimension_11",
            count: 1
        },
        {
            dimension: "dimension3",
            subdimension: "subdimension_12",
            count: 1
        },
        {
            dimension: "dimension4",
            subdimension: "subdimension_13",
            count: 1
        }
    ]
}

export const getMostImpacted = (count?:number) =>{
    const distribution = userDataSummary.subdimensionDistribution
    distribution.sort((a,b)=>{
        return b.count - a.count
    })
    if(count){
        return distribution.slice(0,count)
    }

    return distribution
}