import type { ImageSourcePropType } from "react-native/types"

export interface singletonResource {
    id: number,
    title: string,
    url: ImageSourcePropType,
    type: "habit" | "onetime",
    description: string
}

export interface collectionsResource {
    id: number,
    title: string,
    total: number,
    featured: singletonResource[],
    description: string
}

export interface skeleton {
    id: number,
    title: string,
    type: 'collections' | 'singleton',
    resources: collectionsResource[] | singletonResource[]
}

const singletonGenerator = (total: number) => {
    const actionsAvailable:{url: ImageSourcePropType, title: string, description:string}[] = [
                    {
                        url: require("./thumb1.png"),
                        title: "Wash on cold cycle",
                        description: "Ultimate merciful insofar war marvelous passion evil abstract endless marvelous overcome. Ideal sea inexpedient depths grandeur spirit deceptions value derive right disgust love inexpedient."
                    },
                    {
                        url: require("./thumb2.png"),
                        title: "Biodegradable toothbrush",
                        description: "Ultimate merciful insofar war marvelous passion evil abstract endless marvelous overcome. Ideal sea inexpedient depths grandeur spirit deceptions value derive right disgust love inexpedient."
                    },
                    {
                        url: require("./thumb3.png"),
                        title: "Sustainable facemasks",
                        description: "Ultimate merciful insofar war marvelous passion evil abstract endless marvelous overcome. Ideal sea inexpedient depths grandeur spirit deceptions value derive right disgust love inexpedient."
                    },
                    {
                        url: require("./thumb4.png"),
                        title: "Nature Friendly Bandages",
                        description: "Ultimate merciful insofar war marvelous passion evil abstract endless marvelous overcome. Ideal sea inexpedient depths grandeur spirit deceptions value derive right disgust love inexpedient."
                    }
    ]

    const types:('onetime'|'habit')[] = ["onetime", "habit"]

    const generatedList:singletonResource[] = []

    for(let i=1; i<=total; i++){
        const action = actionsAvailable[Math.floor(Math.random() * actionsAvailable.length)];
        const type = types[Math.floor(Math.random() * types.length)]
        if(action && type){
            const aggAction:singletonResource = {
                ...action,
                id: i,
                type: type
            }
            generatedList.push(aggAction)
        }
    }

    return generatedList
}

export const exploreSkeleton: skeleton[] = [
    {
        id: 1,
        title: "Most liked collections",
        type: "collections",
        resources: [
            {
                id: 1,
                title: "Easy-peasy actions",
                total: 28,
                featured: singletonGenerator(3),
                description: "Simple and easy to actions."
            },
            {
                id: 2,
                title: "For students",
                total: 12,
                featured: singletonGenerator(3),
                description: "A collection of actions tailored toward students and for those who are on a tight budget."
            },
            {
                id: 3,
                title: "Fashion-able actions",
                total: 5,
                featured: singletonGenerator(3),
                description: "A collection for every fashion conscious buyer."
            },
            {
                id: 4,
                title: "Home Essentials",
                total: 23,
                featured: singletonGenerator(3),
                description: "A collections of actions that cam improve your home."
            },
        ]
    },
    {
        id: 2,
        title: "Favourite 5-min actions",
        type: 'singleton',
        resources: singletonGenerator(50)
    },
    {
        id: 3,
        title: "Think big",
        type: 'singleton',
        resources: singletonGenerator(50)
    },
    {
        id: 4,
        title: "Patience and time",
        type: 'singleton',
        resources: singletonGenerator(50)
    },
    {
        id: 5,
        title: "Trusting the journey",
        type: "collections",
        resources: [
            {
                id: 1,
                title: "Easy-peasy actions",
                total: 28,
                featured: singletonGenerator(3),
                description: "Simple and easy to actions."
            },
            {
                id: 2,
                title: "For students",
                total: 12,
                featured: singletonGenerator(3),
                description: "A collection of actions tailored toward students and for those who are on a tight budget."
            },
            {
                id: 3,
                title: "Fashion-able actions",
                total: 5,
                featured: singletonGenerator(3),
                description: "A collection for every fashion conscious buyer."
            },
            {
                id: 4,
                title: "Home Essentials",
                total: 23,
                featured: singletonGenerator(3),
                description: "A collections of actions that cam improve your home."
            },
        ]
    },
    {
        id: 6,
        title: "Favourite 5-min actions",
        type: 'singleton',
        resources: singletonGenerator(50)
    },
    {
        id: 7,
        title: "Think big",
        type: 'singleton',
        resources: singletonGenerator(50)
    },
    {
        id: 8,
        title: "Patience and time",
        type: 'singleton',
        resources: singletonGenerator(50)
    },
]

export const newActions:skeleton = {
    id: 1,
    title: "New this month",
    type: 'singleton',
    resources: singletonGenerator(15)
}