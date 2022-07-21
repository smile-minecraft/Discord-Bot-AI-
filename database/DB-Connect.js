const { database } = require('../json/config.json');
const mongoose = require('mongoose');


const conn = mongoose.createConnection(
  database,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   },
);
conn.on('open', () => {
    console.log('開啟 mongodb 連線');
});
conn.on('err', (err) => {
    console.log('err:' + err);
});

module.exports = conn; // commonJs 語法，匯出conn模組。