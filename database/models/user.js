const db = require('../database.js');
const DataTypes = require('sequelize');

const user = db.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
        user_nickname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
		balance: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
        description: {
            type: DataTypes.STRING,
        },
		level: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		xp: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		minecraft_id_java: {
			type: DataTypes.STRING,
		},
		minecraft_id_bedrock: {
			type: DataTypes.STRING,
		},
		color_R: {
			type: DataTypes.INTEGER,
			defaultValue: 255,
			allowNull: false,
		},
		color_G: {
			type: DataTypes.INTEGER,
			defaultValue: 255,
			allowNull: false,
		},
		color_B: {
			type: DataTypes.INTEGER,
			defaultValue: 255,
			allowNull: false,
		},
	}, {
		timestamps: true,
	});
module.exports = user;