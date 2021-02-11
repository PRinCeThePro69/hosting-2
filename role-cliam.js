const firstMessage = require('./first-message')


module.exports = client => {
    const channelID = '808723860253966387'

    firstMessage(client, channelID, 'hello world', [])
}