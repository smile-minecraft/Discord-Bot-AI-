const db = require('../database.js');
const DataTypes = require('sequelize');

const suggest = db.define('suggests', {
		suggest_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
            autoIncrement: true,
		},
        suggest_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
		solved: {
			type: DataTypes.BOOLEAN,
            defaultValue: false,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		result: {
			type: DataTypes.STRING,
		},
        message_id: {
            type: DataTypes.STRING,
        },
	}, {
		timestamps: true,
	});
module.exports = suggest;