const db = require('../database.js');
const DataTypes = require('sequelize');

const bug = db.define('bugs', {
		bug_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
            autoIncrement: true,
		},
        bug_description: {
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
        evidence_URL: {
            type: DataTypes.STRING,
        },
        message_id: {
            type: DataTypes.STRING,
        },
	}, {
		timestamps: true,
	});
module.exports = bug;