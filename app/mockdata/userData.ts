export const userDataSummary = {
    name: "Reitwiec",
    actionsCompleted: 108,
    totalActions: 2000,
    totalSubdimensions: 55,
    subdimensionsImpacted: 10,
    totalContributions: 437,
    contributionsPerDimension: [
        {dimension: "dimension1", value: 78,},
        {dimension: "dimension2", value: 127,},
        {dimension: "dimension3", value: 93,},
        {dimension: "dimension4", value: 62,},
        {dimension: "dimension5", value: 77,},
    ],
    subdimensionDistribution: [
        {
            dimension: "dimension1",
            subdimension: "Support Farmers",
            count: 2
        } ,
        {
            dimension: "dimension2",
            subdimension: "Sustainable Fashion",
            count: 1
        },
        {
            dimension: "dimension3",
            subdimension: "Vegan Lifestyle",
            count: 17
        },
        {
            dimension: "dimension1",
            subdimension: "Female Led",
            count: 3
        },
        {
            dimension: "dimension1",
            subdimension: "Made in India",
            count: 2
        },
        {
            dimension: "dimension2",
            subdimension: "Avoid Single-Use",
            count: 2
        },
        {
            dimension: "dimension2",
            subdimension:  "Renewable Energy",
            count: 3
        },
        {
            dimension: "dimension3",
            subdimension: "Combat Poaching",
            count: 2
        },
        {
            dimension: "dimension3",
            subdimension: "Help the stray",
            count: 1,
        },
        {
            dimension: "dimension5",
            subdimension: "100% Natural",
            count: 1
        },
        {
            dimension: "dimension5",
            subdimension: "Pet-Parent Sustainably",
            count: 1
        },
        {
            dimension: "dimension3",
            subdimension: "Stop Animal Cruelty",
            count: 1
        },
        {
            dimension: "dimension4",
            subdimension: "Zero Waste",
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