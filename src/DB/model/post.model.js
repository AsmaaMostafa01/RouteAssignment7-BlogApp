import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";

export class PostModel extends Model {}
PostModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "p_id",
    },
    title: { type: DataTypes.STRING(255), allowNull: false, field: "p_title" },
    content: { type: DataTypes.STRING, allowNull: false, field: "p_content" },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true, // soft delete
    modelName:"posts"
  },
);
