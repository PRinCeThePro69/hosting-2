const { Message } = require("discord.js")

const addReactions = (message, reactions) => {
    message.react(rreactions[0])
    reactions.shiift()
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750)
    }

}


module.exports = async (client, id, text, reactions = {}) => {
    const channel = await client.channels.fetch(id)

    channel.messages.fetch().then((messages) => {
        if (Message.size === 0) {
            //send msg
            channel.send(text).then(message => {
                addReactions(message, reactions)

            })

        
        } else {
            // edit
        }
    })

}