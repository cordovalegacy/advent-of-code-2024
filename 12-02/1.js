// the data consists of many reports
// there is one report per line
// each report is a list of numbers called levels
// levels are space separated

//sample: (6 reports, 5 levels)
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9

// need to find which reports are safe
// safe reports contain levels that only gradually increase or decrease

// the levels are either all increasing or all decreasing
// any two adjacent levels differ by at least one or at most three

// sum up safe report count

import handleTextFileExtraction from '../utilities/textFileExtractor.cjs'

const handleTextFormatting = async (extractedText) => {
    return extractedText.toString()
}

const handleParsingReportsIntoListsOfLevels = async (parsedData) => {
    const reportsWithLevels = []
    const listsOfLevelsWithSpaces = []
    parsedData.forEach((report, _) => listsOfLevelsWithSpaces.push(report.split(" ")))
    listsOfLevelsWithSpaces.forEach((level, _) => {
        const newReport = level.filter((level) => level !== " ")
        reportsWithLevels.push(newReport)
    })
    return reportsWithLevels
}

const handleDetectSafeReports = async ({ reportsWithLevels, reportIdx, safeReportCount }) => {
    let countOfSafeReports = safeReportCount
    let arrLengthMatcher = 0
    const report = reportsWithLevels[reportIdx]
    if (reportIdx > reportsWithLevels.length - 1) {
        return
    }

    report.map((val, idx, arr) => {
        const difference = +arr[idx + 1] - +arr[idx]

        const isBetweenPositiveOneAndThree = difference >= 1 && difference <= 3
        const isBetweenNegativeOneAndThree = difference <= -1 && difference >= -3
        const isPositive = Math.sign(difference) === 1
        const isNegative = Math.sign(difference) === -1

        if (isPositive && isBetweenPositiveOneAndThree) {
            arrLengthMatcher++
            console.log({ difference }, { val }, { idx }, { arr: arr.length }, { reportIdx })
        } 
        
        else if (isNegative && isBetweenNegativeOneAndThree) {
            arrLengthMatcher++
            console.log({ difference }, { val }, { idx }, { arr: arr.length }, { reportIdx })
        } 
        
        else {
            return
        }

        if (arrLengthMatcher === arr.length - 1) {
            console.log("MET", arrLengthMatcher === arr.length - 1, arrLengthMatcher, arr.length - 1)
            countOfSafeReports++
            return
        }
    })

    console.log("-----------------------")
    console.log("REPORT INDEX: ", reportIdx)
    console.log("SAFE REPORT COUNT: ", countOfSafeReports)
    handleDetectSafeReports({ reportsWithLevels, reportIdx: reportIdx + 1, safeReportCount: countOfSafeReports })
}

const handleParsingAndExtractionOfData = async () => {
    const extractedText = await handleTextFileExtraction()
    const formattedText = await handleTextFormatting(extractedText)
    const parsedData = await formattedText.replaceAll("\n", " * ").split(" * ")
    const reportsWithLevels = await handleParsingReportsIntoListsOfLevels(parsedData)
    const safeReports = await handleDetectSafeReports({ reportsWithLevels, reportIdx: 0, safeReportCount: 0 })
}

handleParsingAndExtractionOfData()