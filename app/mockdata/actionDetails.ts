import type { ImageSourcePropType } from "react-native/types"

type impacts = {
    effort: 'minimal' | 'medium' | 'high',
    expense: 'minimal' | 'medium' | 'high',
    impact: 'minimal' | 'medium' | 'high'
}

export type milestone = {
    title: string,
    targetValue: number,
}

export interface actionDetail {
    id: number,
    url: ImageSourcePropType,
    title: string,
    type: "habit"|"onetime",
    totalCauses: number,
    topCauses: any[],
    causes: any[],
    problemStatement: string,
    solution: string,
    status: 'completed' | 'inProgress' | 'uncompleted',
    impactDist: impacts,
    milestones: milestone[],
    timesCompleted: number,
    kauriUsersCompleted: number
}

const problemStatement = "Prejudice battle revaluation mountains contradict christianity abstract god. Contradict madness pinnaclebattle grandeur reason ubermensch philosophy sexuality. Faithful christian justice merciful revaluation. Prejudice prejudice pinnacle dead salvation contradict ultimate disgust free aversion. Hope prejudice free spirit derive sexuality zarathustra aversion. Horror christian disgust love faithful aversion gains. Convictions madness chaos holiest decrepit depths fearful noble victorious holiest christian abstract."
const solution = "Ultimate merciful insofar war marvelous passion evil abstract endless marvelous overcome. Ideal sea inexpedient depths grandeur spirit deceptions value derive right disgust love inexpedient. War joy contradict reason play ideal ultimate superiority faithful spirit noble free. Faithful value spirit ultimate prejudice christianity aversion contradict insofar pious. Gains burying law."

const actionDetails:actionDetail[] = [
    {
        id: 0,
        url: require("./thumb1.png"),
        title: "Wash on cold cycle",
        type: 'habit',
        totalCauses: 8,
        kauriUsersCompleted: 11400,
        topCauses: [
            {
                dimension: "dimension1",
                note: "7 litres of water saved"
            },
            {
                dimension: "dimension2",
                note: "4 kWh of energy saved"
            },
            {
                dimension: "dimension3",
                note: "0.5 kg CO2e of emissions saved"
            },
            {
                dimension: "dimension4",
                note: "20kgs of plastic saved"
            }
        ],
        causes: [
            {
                dimension: "dimension1",
                subdimension: "subdimension_1",
            } ,
            {
                dimension: "dimension2",
                subdimension: "subdimension_2",
            },
            {
                dimension: "dimension3",
                subdimension: "subdimension_3",
            },
            {
                dimension: "dimension1",
                subdimension: "subdimension_4",
            } ,
            {
                dimension: "dimension2",
                subdimension: "subdimension_5",
            },
            {
                dimension: "dimension3",
                subdimension: "subdimension_6",
            },
            {
                dimension: "dimension4",
                subdimension: "subdimension_7",
            },
            {
                dimension: "dimension4",
                subdimension: "subdimension_8",
            },
        ],
        problemStatement,
        solution,
        status: 'uncompleted',
        impactDist:{
            effort: 'minimal',
            expense: 'high',
            impact: 'minimal'
        },
        milestones: [
            {
                title: "If 500 people do it, Bangalore becomes traffic free",
                targetValue: 500,
            },
            {
                title: "If 1k people do it, Bangalore becomes traffic free",
                targetValue: 1000
            },
            {
                title: "If 5k people do it, Bangalore becomes traffic free",
                targetValue: 5000
            },
            {
                title: "If 10k people do it, Bangalore becomes traffic free",
                targetValue: 10000
            },
            {
                title: "If 25k people do it, Bangalore becomes traffic free",
                targetValue: 25000
            }
        ],
        timesCompleted: 0
    },
    {
        id: 1,
        url: require("./thumb2.png"),
        title: "Biodegradable toothbrush",
        type: 'habit',
        totalCauses: 8,
        kauriUsersCompleted: 1320,
        topCauses: [
            {
                dimension: "dimension2",
                note: "7 litres of water saved"
            },
            {
                dimension: "dimension5",
                note: "4 kWh of energy saved"
            },
            {
                dimension: "dimension3",
                note: "0.5 kg CO2e of emissions saved"
            },
            {
                dimension: "dimension4",
                note: "20kgs of plastic saved"
            }
        ],
        causes: [
            {
                dimension: "dimension1",
                subdimension: "subdimension_1",
            } ,
            {
                dimension: "dimension2",
                subdimension: "subdimension_2",
            },
            {
                dimension: "dimension3",
                subdimension: "subdimension_3",
            },
            {
                dimension: "dimension1",
                subdimension: "subdimension_4",
            } ,
            {
                dimension: "dimension2",
                subdimension: "subdimension_5",
            },
            {
                dimension: "dimension3",
                subdimension: "subdimension_6",
            },
            {
                dimension: "dimension4",
                subdimension: "subdimension_7",
            },
            {
                dimension: "dimension4",
                subdimension: "subdimension_8",
            },
        ],
        problemStatement,
        solution,
        status: 'uncompleted',
        impactDist:{
            effort: 'minimal',
            expense: 'high',
            impact: 'minimal'
        },
        milestones: [
            {
                title: "If 500 people do it, Bangalore becomes traffic free",
                targetValue: 500,
            },
            {
                title: "If 1k people do it, Bangalore becomes traffic free",
                targetValue: 1000
            },
            {
                title: "If 5k people do it, Bangalore becomes traffic free",
                targetValue: 5000
            },
            {
                title: "If 10k people do it, Bangalore becomes traffic free",
                targetValue: 10000
            },
        ],
        timesCompleted: 0
    },
    {
        id: 2,
        url: require("./thumb3.png"),
        title: "Sustainable facemasks",
        type: 'habit',
        totalCauses: 8,
        kauriUsersCompleted: 400,
        topCauses: [
            {
                dimension: "dimension1",
                note: "7 litres of water saved"
            },
            {
                dimension: "dimension3",
                note: "4 kWh of energy saved"
            },
            {
                dimension: "dimension3",
                note: "0.5 kg CO2e of emissions saved"
            },
            {
                dimension: "dimension2",
                note: "20kgs of plastic saved"
            }
        ],
        causes: [
            {
                dimension: "dimension1",
                subdimension: "subdimension_1",
            } ,
            {
                dimension: "dimension2",
                subdimension: "subdimension_2",
            },
            {
                dimension: "dimension3",
                subdimension: "subdimension_3",
            },
            {
                dimension: "dimension1",
                subdimension: "subdimension_4",
            } ,
            {
                dimension: "dimension2",
                subdimension: "subdimension_5",
            },
            {
                dimension: "dimension3",
                subdimension: "subdimension_6",
            },
            {
                dimension: "dimension4",
                subdimension: "subdimension_7",
            },
            {
                dimension: "dimension4",
                subdimension: "subdimension_8",
            },
        ],
        problemStatement,
        solution,
        status: 'uncompleted',
        impactDist:{
            effort: 'minimal',
            expense: 'high',
            impact: 'minimal'
        },
        milestones: [
            {
                title: "If 500 people do it, Bangalore becomes traffic free",
                targetValue: 500,
            },
            {
                title: "If 1k people do it, Bangalore becomes traffic free",
                targetValue: 1000
            },
            {
                title: "If 5k people do it, Bangalore becomes traffic free",
                targetValue: 5000
            },
            {
                title: "If 10k people do it, Bangalore becomes traffic free",
                targetValue: 10000
            },
            {
                title: "If 25k people do it, Bangalore becomes traffic free",
                targetValue: 25000
            }
        ],
        timesCompleted: 0
    },
    {
        id: 3,
        url: require("./thumb4.png"),
        title: "Nature Friendly Bandages",
        type: 'habit',
        totalCauses: 8,
        kauriUsersCompleted: 2481,
        topCauses: [
            {
                dimension: "dimension5",
                note: "7 litres of water saved"
            },
            {
                dimension: "dimension3",
                note: "4 kWh of energy saved"
            },
            {
                dimension: "dimension5",
                note: "0.5 kg CO2e of emissions saved"
            },
            {
                dimension: "dimension1",
                note: "20kgs of plastic saved"
            }
        ],
        causes: [
            {
                dimension: "dimension1",
                subdimension: "subdimension_1",
            } ,
            {
                dimension: "dimension2",
                subdimension: "subdimension_2",
            },
            {
                dimension: "dimension3",
                subdimension: "subdimension_3",
            },
            {
                dimension: "dimension1",
                subdimension: "subdimension_4",
            } ,
            {
                dimension: "dimension2",
                subdimension: "subdimension_5",
            },
            {
                dimension: "dimension3",
                subdimension: "subdimension_6",
            },
            {
                dimension: "dimension4",
                subdimension: "subdimension_7",
            },
            {
                dimension: "dimension4",
                subdimension: "subdimension_8",
            },
        ],
        problemStatement,
        solution,
        status: 'uncompleted',
        impactDist:{
            effort: 'minimal',
            expense: 'high',
            impact: 'minimal'
        },
        milestones: [
            {
                title: "If 500 people do it, Bangalore becomes traffic free",
                targetValue: 500,
            },
            {
                title: "If 1k people do it, Bangalore becomes traffic free",
                targetValue: 1000
            },
            {
                title: "If 10k people do it, Bangalore becomes traffic free",
                targetValue: 10000
            },
            {
                title: "If 25k people do it, Bangalore becomes traffic free",
                targetValue: 25000
            }
        ],
        timesCompleted: 0
    },
]

export const getActionDetails = (id):actionDetail => {
    return actionDetails[id]!
}