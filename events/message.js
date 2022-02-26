module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
        const badwords = require("../json/config.json");
        for(let i=0;i<badwords.length;i++){
        if(message.content.include(badwords[i]) ){
            message.author.send("不可以說髒話:/");
            message.delete();
            console.log("刪除一則不優質訊息:v")
        }
    }
	},
};