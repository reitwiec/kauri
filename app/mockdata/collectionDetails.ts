import type { collectionsResource } from "./exploreSection"
import type { resource } from "./imageConfig"

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface collectionDetail extends Omit<collectionsResource, 'featured'>{
    owner: string,
    likes: number,
    totalDimensions: number,
    resources: resource[]
}

const collectionDetails: collectionDetail[] = [
]

export const getActionDetails = (id):collectionDetail => {
    return collectionDetails[id]!
}