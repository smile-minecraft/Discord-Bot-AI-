const db = require('../database.js');
const DataTypes = require('sequelize');

const bug = db.define('plugins', {
		plugin_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
            autoIncrement: true,
		},
        spigot_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
		version: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		downloadURL: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        pluginName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
		installServers: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: true,
		},
	}, {
		timestamps: true,
	});
module.exports = bug;