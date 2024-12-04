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

const fs = require('fs')

const leftList = []
const rightList = []
let sum = 0

const handleNumericSort = (arr) => {
    return arr.sort((a, b) => a - b)
}

const calculateDifference = () => {
    const sortedAscendingLeftList = handleNumericSort(leftList)
    const sortedAscendingRightList = handleNumericSort(rightList)
    sortedAscendingLeftList.forEach((_, i) => {
        sum += Math.abs(sortedAscendingRightList[i] - sortedAscendingLeftList[i])
    })
    console.log(sortedAscendingLeftList);
    console.log(sortedAscendingRightList);
    console.log(sum);
}

const parseInputText = () => {
    fs.readFile("input.txt", (_, data) => {
        let parsedData = data.toString().replaceAll("\n", ",").replaceAll("   ", ",").split(",")
        parsedData.forEach((text, i) => {
            if (i & 1) {
                rightList.push(text)
            } else {
                leftList.push(text)
            }
        })
        calculateDifference()
    })
}

parseInputText()

