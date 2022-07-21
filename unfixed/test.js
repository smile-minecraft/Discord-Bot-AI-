const PlayerModel = require('./PlayerModel');

// 富查詢條件，物件格式，鍵值對，下面為查詢 name 為 lisi 的記錄
PlayerModel.find({ name: 'test' }).then(doc => {
    console.log(doc);
});