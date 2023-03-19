## To understand the how navigator is setup in TypeScript checkout the following links: 
- https://javascript.plainenglish.io/react-navigation-v6-with-typescript-5c9c065d45a5
- https://javascript.plainenglish.io/react-navigation-v6-with-typescript-nested-navigation-part-2-87844f643e37



## Optimizations required:
- Move to recyclerListView from flatlist

## Search and filter system

filteredSettings = {
    searchQuery: "",
    appliedFilters: [
        {
            key: ,
            value: ,
        }
    ]
}

## Analytics section

Total actions (Store every time an action is completed)

Total sustainable purchases (Total purchase history)
What category type of purchases (Map through purchase history and categorise)
    Total amount spent on sustainable purchases (Map through purchase history and sum the purchase amth)

What dimensions have you contributed towards? (Every time a purchase or action is completed increase the amount in database)

What causes in that dimension you have contributed towards? (Every time a purchase or action is completed increase the amount in database)

Home many high, medium and low impact actions have you completed? (Map through all the actions completed and calculate)
Number of positive Impact sessions (store positive sessions)

Dendro chart

Hightlights:
    Number of habits formed (Map through actions completed and calculate)
    Where does your impact score lie? (Store impact score in a leaderboard, doesn't have to be realtime, where does the user lie)

## Positive Impact Session

What milestones have you helped achieve?
    Map through actions completed and calculate all the milestones that are achieved

## Impact

- Need to make it more component based
- Add minimum check for width
- Add translations