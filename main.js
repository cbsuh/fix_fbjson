/* You might want to check first if the file exists and stuff but this is an example. */

const fs = require('fs')
const utf8 = require('utf8')

function FixStringValue(value) {
    switch (typeof value) {
        case 'string':
            return utf8.decode(value)
        case 'object':
            var newObject = new Object()
            for (attr in value) {
                newObject[attr] = FixStringValue(value[attr])
            }
            return newObject
        default:
            return value
    }
}

module.exports = function(filePath) {
    let data = fs.readFileSync(filePath).toString() /* open the file as string */
    let object = JSON.parse(data) /* parse the string to object */
    let fixed = FixStringValue(object)
    return JSON.stringify(fixed, false, 3) /* use 3 spaces of indentation */
}
