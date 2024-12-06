// there are location id's in both lists (duplicates)
// figure out exactly how many duplicates are in the columns (appear in each list once)

import { handleSplitIntoLists } from "./1.js"
import textFileExtractor from "../utilities/textFileExtractor.cjs"

// calculate a similarity score by adding up each number in the left list after multiplying it by the number of times that number appears in the right list

const handleRetrieveSortedAscendingLists = async () => {
    const parsedData = await textFileExtractor()
    return await handleSplitIntoLists(parsedData)
}

const handleFindListDuplicates = async ({ leftList, rightList }) => {
    let similarityScore = 0
    const matchingItemsArr = []
    leftList.reduce((_, currentItem) => {
        const rightListItem = rightList.find((item) => item === currentItem)
        if (rightListItem) {
            const allMatchingRightListItems = rightList.filter((duplicateItem) => duplicateItem === currentItem)
            matchingItemsArr.push(rightListItem)
            similarityScore += rightListItem * allMatchingRightListItems.length
        }
    })
    return similarityScore
}

handleRetrieveSortedAscendingLists()
    .then((data) => handleFindListDuplicates(data)
        .then((result) => console.log(result)))