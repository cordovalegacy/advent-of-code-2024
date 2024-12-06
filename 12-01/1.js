// pair up the numbers
// measure how far apart they are

//pair up the smallest number in the left list, with the smallest number in the right list
// then the second smallest number in the left list with the second smallest number in the right list
// and so on

// within each pair, measure how far apart the two numbers are

// sum up the total difference between each pair

// example

// 3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3

// 1. create two lists with mock data
// 2. find the smallest number in both lists, pair them, then pop them

import handleTextFileExtraction from '../utilities/textFileExtractor.cjs'

const handleTextFormatting = async(extractedString) => {
    return extractedString.toString().replaceAll("\n", ",").replaceAll("   ", ",").split(",")
}

export const handleNumericSort = (arr) => {
    return arr.sort((a, b) => a - b)
}

const handleCalculateDistance = (leftList, rightList) => {
    const sortedAscendingLeftList = handleNumericSort(leftList)
    const sortedAscendingRightList = handleNumericSort(rightList)
    let sum = 0
    sortedAscendingLeftList.forEach((_, i) => {
        sum += Math.abs(sortedAscendingRightList[i] - sortedAscendingLeftList[i])
    })
    return sum
}

export const handleSplitIntoLists = async (arr) => {
    const leftList = []
    const rightList = []
    arr.forEach((text, i) => {
        const num = Number(text.trim())
        if (i & 1) {
            rightList.push(num)
        } else {
            leftList.push(num)
        }
    })
    return { leftList, rightList }
}

export const handleDistanceOfPairsInAscendingList = async () => {
    const extractedText = await handleTextFileExtraction()
    const parsedData = await handleTextFormatting(extractedText)
    const { leftList, rightList } = await handleSplitIntoLists(parsedData)
    return handleCalculateDistance(leftList, rightList)
}

handleDistanceOfPairsInAscendingList().then((result) => console.log(result))
