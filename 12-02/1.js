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

import handleTextFileExtraction from '../utilities/textFileExtractor.cjs'

const handleTextFormatting = async (extractedText) => {
    return extractedText.toString()
}

const initializeExtraction = async () => {
    const extractedText = await handleTextFileExtraction()
    const parsedData = await handleTextFormatting(extractedText)
    console.log(parsedData);

}

initializeExtraction()