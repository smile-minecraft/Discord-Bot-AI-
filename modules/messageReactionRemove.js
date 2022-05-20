module.exports = {
	name: 'messageReactionRemove',
	once: false,
	execute(client,messageReaction) {
        if (messageReaction.message.id == '888796855130001468'){
            if (messageReaction.emoji.name == '✅'){
                messageReaction.message.guild.members.cache.get(messageReaction.message.author.id).roles.add('888796041233719346');
            }
            else if(messageReaction.emoji.name == '⚠️'){
                messageReaction.message.guild.members.cache.get(messageReaction.message.author.id).roles.add('977249076808671303');
            }
        }
	},
};