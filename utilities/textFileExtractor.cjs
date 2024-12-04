const fs = require('fs').promises

module.exports = handleTextFileExtraction = async () => {
    const data = await fs.readFile("input.txt")
    return data.toString().replaceAll("\n", ",").replaceAll("   ", ",").split(",")
}