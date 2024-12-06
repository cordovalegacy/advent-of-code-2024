const fs = require('fs').promises

module.exports = handleTextFileExtraction = async () => {
    return await fs.readFile("input.txt")
}