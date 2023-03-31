import type { ImageSourcePropType } from "react-native";

interface shopItem {
    id: number,
    src: ImageSourcePropType,
    title: string,
    price: string,
    aspectRatio: number,
    type: '1' | '2' | '3',
    refillable: boolean,
}

export const shopFeatImages = [require('./shopFeat.png'), require('./shopFeat1.png'), require('./shopFeat2.png')]
// h = w * 1/aspectRatio
// aspectRatio = w/h
/*
    type = 1 => 2:3
    type = 2 => 1:1
    type = 3 => 4:3
*/
const availableItems:{src: ImageSourcePropType,
    title: string,
    price: string,
    aspectRatio:number,
    type: '1' | '2' | '3'
}[] = [
    {
        src: require("./shop1.png"),
        title: "Smoked Kohl Eye Pencil",
        price: "650.00",
        aspectRatio: 163.62/245,
        type: '1'
    },
    {
        src: require("./shop2.png"),
        title: "Honey Fix Face Wash",
        price: "440.00",
        aspectRatio: 1,
        type: '2'
    },
    {
        src: require("./shop3.png"),
        title: "Strawberry lip balm",
        price: "1,190.00",
        aspectRatio: 163/122.45,
        type: '3'

    },
    {
        src: require("./shop4.png"),
        title: "Rose Quartz Facial Roller",
        price: "1,699.00",
        aspectRatio: 1,
        type: '2'
    },
    {
        src: require("./shop5.png"),
        title: "Santhra Lip Balm",
        price: "195.00",
        aspectRatio: 183.6/245,
        type: '1'
    },
    {
        src: require("./shop6.png"),
        title: "Passport cover",
        price: "1,190.00",
        aspectRatio: 185/123,
        type: '3'
    },
]

const generateShopList = (total:number, refill?:boolean):shopItem[] => {
    const shopList:shopItem[] = []
    
    for(let i=1; i<=total; i++){
        const item = {id: i , ...availableItems[Math.floor(Math.random() * availableItems.length)], refillable: refill?refill:(i-1)%8 === 0}
        if(item){
            shopList.push(item as any)
        }
    }
    return shopList
}
export const shopData:shopItem[] = generateShopList(500)
export const shopDataAlt:shopItem[] = generateShopList(100)
export const shopDataRefills:shopItem[] = generateShopList(150, true)