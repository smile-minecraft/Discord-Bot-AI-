## AI 阿姨 - Discord機器人 
![](https://img.shields.io/badge/lincense-MIT-blue.svg) 
[![](https://discord.com/api/guilds/867315843519610890/widget.png)](https://discord.gg/NW49YbJjuv)

### 主要功用
目前主要作為合作社伺服器的功能性機器人使用
原代碼可作為機器人設計的參考，
此機器人在設計過程盡可能以分離式的檔案設計每個組件環節，以利增加擴充性與開發的便利性
目前預計完善更多功能

### 具體功能
1. Discord 音樂機器人
2. 加入/離開消息
3. 儲存用戶自我介紹
4. 各項資訊查詢(Covid/minecraft server狀態/匯率/IP解析...等等)

### 使用說明
注意: 此機器人是設計給單一群組使用

1. 將原代碼解壓縮後，先利用npm 安裝需要的模組:
```npm i 模組名稱```

2. 將`config_example.json`改為`config.json`，並填寫配置
```json
{
    "WelcomeChannel":"加入消息 頻道ID", 
    "GoodByeChannel":"離開消息 頻道ID",
    "SuggestChannel":"建議 頻道ID",
    "ReportChannel":"舉報 頻道ID",
    "SupportChannel":"支援 頻道ID",
    "WelcomeRole" : "新加入成員 身分組ID",
    "AdminRole" : "管理員 身分組ID",

    "help" : "\n/hi 讓機器人打招呼\n/server 查看伺服器相關狀態\n/user 查看自己的個人資訊\n\n**機器人相關**\n/ping 機器人的ping值\n/ver 機器人的版本",
    "ver":"1.4.0"
}
```
3. 在終端機中運行
```node index.js```


### 如何幫助機器人/取用開源代碼
各位可以針對代碼提出指教，並協助我做的更好
也可以取用程式碼的=中的任何一部分。

