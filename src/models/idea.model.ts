const { DataTypes } = require("sequelize");
import { sequelize } from "../config/db";

const Idea = sequelize.define("idea", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['pending', 'approved', 'rejected'],
        defaultValue: 'pending',
    }
}, { timestamps: true });

export default Idea;