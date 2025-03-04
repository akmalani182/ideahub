const { DataTypes } = require("sequelize");
import { sequelize } from "../config/db";
import Idea from "./idea.model";
import User from "./user.model";

const Comments = sequelize.define("comments", {
    comment: {
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

Comments.belongsTo(User, { foreignKey: "userId" });
Comments.belongsTo(Idea, { foreignKey: "ideaId" });

Idea.hasMany(Comments, { foreignKey: "ideaId" });
User.hasMany(Comments, { foreignKey: "userId" });

export default Comments;