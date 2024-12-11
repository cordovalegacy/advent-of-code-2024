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

// if able to remove one char from the report and it makes it safe, then add that to the total count
// build a retry mechanism that pops off a value and rechecks the report at hand

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

const handleEachReport = async (report, arrLengthMatcher, reportIdx) => {
    let direction = null

    report.forEach((val, idx, arr) => {
        const difference = +arr[idx + 1] - +arr[idx]

        const isBetweenPositiveOneAndThree = difference >= 1 && difference <= 3
        const isBetweenNegativeOneAndThree = difference <= -1 && difference >= -3

        if (isBetweenPositiveOneAndThree) {
            if (direction === null) {
                direction = 'positive'
            }
            else if (direction === 'negative') {
                return
            }
            arrLengthMatcher++
        }

        else if (isBetweenNegativeOneAndThree) {
            if (direction === null) {
                direction = 'negative'
            }
            else if (direction === 'positive') {
                return
            }
            arrLengthMatcher++
        }

        else {
            const indexOfFailedAttempt = idx
            let newArrLengthMatcher = 0
            const reportToRetry = report.slice(0, indexOfFailedAttempt)
            reportToRetry.forEach((val, idx, arr) => {

                let difference = +arr[idx + 1] - +arr[idx]
                const slicedLengthPoint = 1

                const isBetweenPositiveOneAndThree = difference >= 1 && difference <= 3
                const isBetweenNegativeOneAndThree = difference <= -1 && difference >= -3

                if (isBetweenPositiveOneAndThree) {
                    newArrLengthMatcher++
                    console.log("+ -> VAL: ", {reportIdx}, { val }, { newArrLengthMatcher }, { difference });
                } else if (isBetweenNegativeOneAndThree) {
                    arrLengthMatcher++
                    console.log("- ->VAL: ", {reportIdx}, { val }, { newArrLengthMatcher }, { difference });
                }
                arrLengthMatcher = (newArrLengthMatcher + slicedLengthPoint)
            })
            // console.log({indexOfFailedAttempt}, {report}, {reportToRetry}, {reportIdx});
            return
        }
    })

    return arrLengthMatcher
}

const handleDetectSafeReports = async ({ reportsWithLevels, reportIdx, safeReportCount }) => {
    let countOfSafeReports = safeReportCount
    let arrLengthMatcher = 0
    const report = reportsWithLevels[reportIdx]

    if (reportIdx > reportsWithLevels.length - 1) {
        return countOfSafeReports
    }

    const result = await handleEachReport(report, arrLengthMatcher, reportIdx)
    arrLengthMatcher = result

    if (arrLengthMatcher === report.length - 1) {
        countOfSafeReports++
    }

    return handleDetectSafeReports({ reportsWithLevels, reportIdx: reportIdx + 1, safeReportCount: countOfSafeReports })
}

const handleParsingAndExtractionOfData = async () => {
    const extractedText = await handleTextFileExtraction()
    const formattedText = await handleTextFormatting(extractedText)
    const parsedData = await formattedText.replaceAll("\n", " * ").split(" * ")
    const reportsWithLevels = await handleParsingReportsIntoListsOfLevels(parsedData)
    const reportCount = await handleDetectSafeReports({ reportsWithLevels, reportIdx: 0, safeReportCount: 0 })
    console.log("REPORT COUNT: ", reportCount);
}

handleParsingAndExtractionOfData()