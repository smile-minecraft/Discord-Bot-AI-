const db = require('../database.js');
const DataTypes = require('sequelize');

const bug = db.define('config', {
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        WelcomeChannel: {
            type: DataTypes.STRING,
        },
		GoodByeChannel: {
			type: DataTypes.STRING,
		},
		SuggestChannel: {
			type: DataTypes.STRING,
		},
		ReportChannel: {
			type: DataTypes.STRING,
		},
        SupportChannel: {
            type: DataTypes.STRING,
        },
        BugChannel: {
            type: DataTypes.STRING,
        },
		WelcomeRole: {
            type: DataTypes.STRING,
        },
		AdminRole: {
            type: DataTypes.STRING,
        },
	}, {
		timestamps: true,
	});
module.exports = bug;