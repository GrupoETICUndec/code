const mutations = require('./mutation')
const queries = require('./query')

module.exports = {
    ...mutations,
    ...queries
}