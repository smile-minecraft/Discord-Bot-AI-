const db = require('../database.js');
const DataTypes = require('sequelize');

const report = db.define('reports', {
		report_id: {
			type: DataTypes.INTEGER,
            autoIncrement: true,
			primaryKey: true,
		},
        report_reason: {
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
		sus_minecraft_id: {
			type: DataTypes.STRING,
		},
        sus_discord_id: {
            type: DataTypes.STRING,
        },
        evidence_URL: {
            type: DataTypes.STRING,
        },
        message_id: {
            type: DataTypes.STRING,
        },

	}, {
		timestamps: true,
	});
module.exports = report;