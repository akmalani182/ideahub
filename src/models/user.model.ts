const { DataTypes } = require("sequelize");
import { sequelize } from "../config/db";

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["user", "admin"],
    defaultValue: "user",
  },
});

export default User;