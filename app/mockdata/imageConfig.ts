import type { ImageSourcePropType } from "react-native"

type impacts = {
    effort: 'minimal' | 'medium' | 'high',
    expense: 'minimal' | 'medium' | 'high',
    impact: 'minimal' | 'medium' | 'high'
}
export type resource = {
    id: number,
    url: ImageSourcePropType,
    title: string,
    type: "habit"|"onetime",
    totalCauses: number,
    topCauses: any[],
    description?: string,
    status: 'completed' | 'inProgress' | 'uncompleted',
    impactDist?: impacts
}

type resources = resource[]

export interface thumbnail {
    count: number,
    resources: resources,
    nextAction: resource
}

export const roadMap:thumbnail = {
    count: 24,
    resources:[
        {
            id: 1,
            url: require("./thumb1.png"),
            title: "Wash on cold cycle",
            type: "habit",
            description: "Fugiat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 15,
            status: 'completed',
            topCauses: [
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
            ]
        },
        {
            id: 2,
            url: require("./thumb2.png"),
            title: "Biodegradable toothbrush",
            type: "habit",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 8,
            status: 'inProgress',
            topCauses: [
                {
                    dimension: "dimension4",
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
            ]
        },
        {
            id: 3,
            url: require("./thumb3.png"),
            title: "Sustainable facemasks",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 10,
            status: 'uncompleted',
            topCauses: [
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 4,
            url: require("./thumb4.png"),
            title: "Nature friendly bandages",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 16,
            topCauses: [
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension3",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 5,
            url: require("./thumb2.png"),
            title: "Biodegradable toothbrush",
            type: "habit",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 9,
            topCauses: [
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 6,
            url: require("./thumb3.png"),
            title: "Sustainable facemasks",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 15,
            topCauses: [
                {
                    dimension: "dimension3",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension3",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },

        {
            id: 7,
            url: require("./thumb1.png"),
            title: "Wash on cold cycle",
            type: "habit",
            description: "Fugiat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 15,
            status: 'completed',
            topCauses: [
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
            ]
        },
        {
            id: 8,
            url: require("./thumb2.png"),
            title: "Biodegradable toothbrush",
            type: "habit",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 8,
            status: 'inProgress',
            topCauses: [
                {
                    dimension: "dimension4",
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
            ]
        },
        {
            id: 9,
            url: require("./thumb3.png"),
            title: "Sustainable facemasks",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 10,
            status: 'uncompleted',
            topCauses: [
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 10,
            url: require("./thumb4.png"),
            title: "Nature friendly bandages",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 16,
            topCauses: [
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension3",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 11,
            url: require("./thumb2.png"),
            title: "Biodegradable toothbrush",
            type: "habit",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 9,
            topCauses: [
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 12,
            url: require("./thumb3.png"),
            title: "Sustainable facemasks",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 15,
            topCauses: [
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension3",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },

        {
            id: 13,
            url: require("./thumb1.png"),
            title: "Wash on cold cycle",
            type: "habit",
            description: "Fugiat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 15,
            status: 'completed',
            topCauses: [
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
            ]
        },
        {
            id: 14,
            url: require("./thumb2.png"),
            title: "Biodegradable toothbrush",
            type: "habit",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 8,
            status: 'inProgress',
            topCauses: [
                {
                    dimension: "dimension4",
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
            ]
        },
        {
            id: 15,
            url: require("./thumb3.png"),
            title: "Sustainable facemasks",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 10,
            status: 'uncompleted',
            topCauses: [
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 16,
            url: require("./thumb4.png"),
            title: "Nature friendly bandages",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 16,
            topCauses: [
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension3",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 17,
            url: require("./thumb2.png"),
            title: "Biodegradable toothbrush",
            type: "habit",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 9,
            topCauses: [
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 18,
            url: require("./thumb3.png"),
            title: "Sustainable facemasks",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 15,
            topCauses: [
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension3",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },

        {
            id: 19,
            url: require("./thumb1.png"),
            title: "Wash on cold cycle",
            type: "habit",
            description: "Fugiat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 15,
            status: 'completed',
            topCauses: [
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
            ]
        },
        {
            id: 20,
            url: require("./thumb2.png"),
            title: "Biodegradable toothbrush",
            type: "habit",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 8,
            status: 'inProgress',
            topCauses: [
                {
                    dimension: "dimension4",
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
            ]
        },
        {
            id: 21,
            url: require("./thumb3.png"),
            title: "Sustainable facemasks",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            totalCauses: 10,
            status: 'uncompleted',
            topCauses: [
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 22,
            url: require("./thumb4.png"),
            title: "Nature friendly bandages",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 16,
            topCauses: [
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension3",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 23,
            url: require("./thumb2.png"),
            title: "Biodegradable toothbrush",
            type: "habit",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 9,
            topCauses: [
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
        {
            id: 24,
            url: require("./thumb3.png"),
            title: "Sustainable facemasks",
            type: "onetime",
            description: "Fugiat cupidatat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
            status: 'uncompleted',
            totalCauses: 15,
            topCauses: [
                {
                    dimension: "dimension2",
                    subdimension: "subdimension_1",
                    count: 2
                } ,
                {
                    dimension: "dimension3",
                    subdimension: "subdimension_2",
                    count: 1
                },
                {
                    dimension: "dimension1",
                    subdimension: "subdimension_3",
                    count: 17
                },
            ]
        },
    ],
    nextAction: {
        id: 1,
        url: require("./thumb1.png"),
        title: "Wash on cold cycle",
        type: "habit",
        description: "Fugiat in non cillum ut aliqua anim anim ut cupidatat. Quis reprehenderit consequat sunt pariatur proident ipsum id cupidatat ipsum. Et eu dolor proident commodo dolore aute dolor aliqua esse non laborum deserunt esse. Aliquip consequat quis exercitation sunt ea enim do in reprehenderit non culpa dolor labore amet. Qui veniam ullamco qui incididunt adipisicing. Non ea irure veniam in dolor consectetur aliquip est. Excepteur aliqua anim culpa nisi ad ex ad id laborum.",
        totalCauses: 15,
        status: 'completed',
        impactDist: {
            effort: 'minimal',
            expense: 'high',
            impact: 'minimal',
        },
        topCauses: [
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
        ]
    },
}