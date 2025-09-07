const fs = require('fs')
const path = require('path')

const getUsers = () => {
    const filePath = path.join(process.env.USERS_FILE)
    return fs.readFileSync(filePath)
}

module.exports = getUsers