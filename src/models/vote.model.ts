const { DataTypes } = require("sequelize");
import { sequelize } from "../config/db";

const Votes = sequelize.define("votes", {
    voteType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ideaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Votes;