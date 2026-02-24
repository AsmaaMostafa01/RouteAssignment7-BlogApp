import { sequelize } from "../connection.db.js";
import { DataTypes } from "sequelize";
export const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "u_id",
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "u_Name", //change the name of attibute
      validate: {
        notEmpty: { msg: "Name can't be empty " }, //built in validation
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "u_email",
      validate: {
        isEmail: { msg: "Email should be formatted like user@exaple.com" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "u_password",
      validate: {
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error("Password must be greater than 6 characters");
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),

      defaultValue: "user",
      field: "u_role",
    },
  },
  {
    timestamps: true,
    createdAt: "u_created_at",
    updatedAt: "u_updated_at",
    hooks: {
      beforeCreate(user) {
        if (!user.name || user.name.length <= 2) {
          throw new Error("Name must be greater than 2 characters");
        }
      },
    },
  },
);
