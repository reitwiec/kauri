import { collectionsResource, singletonGenerator, singletonResource } from "./exploreSection"
import type { resource } from "./imageConfig"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface collectionDetail extends Omit<collectionsResource, 'featured'>{
    owner: string,
    likes: number,
    totalDimensions: number,
    resources: singletonResource[]
}

const collectionDetails: collectionDetail[] = [
    {   
        id: 0,
        title: 'Easy-peasy actions',
        description: 'A collection of simple and straightforward actions that can be easily accomplished without much effort or difficulty.',
        owner: 'Kauri',
        likes: 10242,
        totalDimensions: 26,
        total: 26,
        resources: singletonGenerator(26)
    },
    {   
        id: 1,
        title: 'For students',
        description: 'A collection of simple and straightforward actions that can be easily accomplished without much effort or difficulty.',
        owner: 'Kauri',
        likes: 23420,
        totalDimensions: 47,
        total: 128,
        resources: singletonGenerator(128)
    },

    {   
        id: 2,
        title: 'Fashion-able actions',
        description: 'A collection of simple and straightforward actions that can be easily accomplished without much effort or difficulty.',
        owner: 'Kauri',
        likes: 1230,
        totalDimensions: 12,
        total: 77,
        resources: singletonGenerator(77)
    },
    {   
        id: 3,
        title: 'Home Essentials',
        description: 'A collection of simple and straightforward actions that can be easily accomplished without much effort or difficulty.',
        owner: 'Kauri',
        likes: 22309,
        totalDimensions: 40,
        total: 200,
        resources: singletonGenerator(200)
    }
]

export const getCollectionDetails = (id):collectionDetail => {
    return collectionDetails[id]!
}