const { default: axios } = require('axios');
const fs = require('fs');
const path = require('path');


module.exports = {

    getResourceName(id) {
        axios.get(`https://api.spiget.org/v2/resources/${id}/versions/latest`)
            .then(res => {
                console.log(res.data.name);

            });
    },
    getResourceLatestVersion(id) {
        axios.get(`https://api.spiget.org/v2/resources/${id}/versions/latest`)
        .then(res => {
            return res.data.name;
        });
    },
    downloadResource(id,name,version) {
        if (!fs.existsSync('./plugins')) {
            fs.mkdirSync('./plugins');
        }

        const downloadPath = path.resolve('./plugins/' + name + '-' + version + '.jar');

        axios.get(`https://api.spiget.org/v2/resources/${id}/download`,{ responseType: 'stream' })
            .then(res => {
                res.data.pipe(fs.createWriteStream(downloadPath));
            });
    },

};

