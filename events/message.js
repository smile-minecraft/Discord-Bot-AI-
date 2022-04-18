module.exports = {
	name: 'messageCreate',
	once: false,
	execute(client,message) {
        console.log("偵測到一則訊息:" + message.content);
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