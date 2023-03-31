export const productDetails = {
    id: 1,
    title: "Calling Print Oversized Unisex Sweatshirt",
    price: "2,900.00",
    brandColor: "#00663A",
    logo: require("./productDetailImages/logo.png"),
    productImages: {
        0: [{type:2, src: require("./productDetailImages/v1_1.png")},{type:2, src: require("./productDetailImages/v1_2.png")}, {type:2, src: require("./productDetailImages/v1_3.png")},{type:2, src: require("./productDetailImages/v1_4.png")}],
        1: [{type:2, src: require("./productDetailImages/v1_1.png")},{type:2, src: require("./productDetailImages/v2_2.png")}, {type:2, src: require("./productDetailImages/v1_3.png")}],
        2: [{type:2, src: require("./productDetailImages/v1_1.png")},{type:2, src: require("./productDetailImages/v3_2.png")}, {type:2, src: require("./productDetailImages/v1_3.png")},{type:2, src: require("./productDetailImages/v1_4.png")}],
    },
    variants: [
        {type:2, src: require("./productDetailImages/v1_2.png")},
        {type:2, src: require("./productDetailImages/v2_2.png")},
        {type:3, src: require("./productDetailImages/v3_2.png")}
    ],
    sizesAvailable:[
        {
            key: 'small',
            value: 'Small',
            available: true
        },
        {
            key: 'medium',
            value: 'Medium',
            available: false
        },
        {
            key: 'large',
            value: 'Large',
            available: true
        },
        {
            key: 'extraLarge',
            value: 'Extra Large',
            available: true
        }
    ],
    productContributions: [
        {
            dimension: "dimension1",
            subdimension: "Female Led",
        } ,
        {
            dimension: "dimension2",
            subdimension: "Renewable Energy",
        },
        {
            dimension: "dimension3",
            subdimension: "Vegan Lifestyle",
        },
    ],
    manufacturing: `Prejudice battle revaluation mountains contradict christianity abstract god. Contradict madness pinnacle battle grandeur reason ubermensch philosophy sexuality. Faithful christian justice merciful revaluation. Prejudice prejudice pinnacle dead salvation contradict ultimate disgust free aversion. Hope prejudice free spirit derive sexuality zarathustra aversion. Horror christian disgust love faithful aversion gains. Convictions madness chaos holiest decrepit depths fearful noble victorious holiest christian abstract.`,
    materials: `Faith insofar faithful contradict god holiest free prejudice reason battle philosophy. Chaos sea reason decrepit play merciful ocean spirit pinnacle. Ultimate deceptions salvation deceptions gains evil. Overcome philosophy ocean aversion self dead deceive oneself play snare merciful. Passion derive law faithful christianity merciful snare pious.`,
    dispose: `Inexpedient abstract faithful zarathustra ascetic insofar society mountains prejudice ascetic faithful fearful. Mountains victorious war against love. Noble snare law ascetic pious madness abstract christianity.`
}