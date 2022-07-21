//node.js 的檔案系統，能夠幫助存取、讀取檔案
let fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	async writeJSON(newUser,id) {
            //先將原本的 json 檔讀出來
    fs.readFile('../json/user.json', function (err, userInfo) {
        if (err) {
            return console.error(err);
        }
        let user = userInfo.toString(); //將二進制數據轉換為字串符
        user = JSON.parse(user);    //將字符串轉換為 JSON 對象
        user.users[id] = newUser;    //將傳來的資訊推送到數組對象中

        let str = JSON.stringify(user);//因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
        fs.writeFile('../json/user.json', str, function (err) {//將字串符傳入您的 json 文件中
            if (err) {
                console.error(err);
            }
            console.log('增加新的用戶進入json檔案中...')
        })
    })
	},
    async deleteJSON(id) {
        //先將原本的 json 檔讀出來
    fs.readFile('../json/user.json', function (err, userInfo) {
        if (err) {
            return console.error(err);
        }
	//將二進制數據轉換為字串符
        let user = userInfo.toString();
	//將字符串轉換成JSON對象
        user = JSON.parse(user);

        //將數據讀出來並刪除指定部分
        delete user.users[id];
        console.log(user);
	//因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
        let str = JSON.stringify(user);

        //最後再將數據寫入
        fs.writeFile('../json/user.json', str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('刪除一個用戶資料...')
        })
    })
    },
    async editJSON(id,newUser) {
        //先將原本的 json 檔讀出來
    fs.readFile('../json/user.json', function (err, userInfo) {
        if (err) {
            return console.error(err);
        }
    //將二進制數據轉換為字串符
        let user = userInfo.toString();
    //將字符串轉換成JSON對象
        user = JSON.parse(user);

    //將數據讀出來並修改指定部分，在這邊我是修改 id 最大的用戶的資料
        user.users[id].info = newUser.info;
        user.users[id].nickname = newUser.nickname;
        user.users[id].donate = newUser.donate;
        user.users[id].Advancements = newUser.Advancements;
        console.log(user);
    //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
        let str = JSON.stringify(user);

        //最後再將數據寫入
        fs.writeFile('../json/user.json', str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('刪除一個用戶資料...')
        })
    })
    },

};