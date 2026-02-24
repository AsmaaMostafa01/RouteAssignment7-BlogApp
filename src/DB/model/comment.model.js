import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";

export class CommentModel extends Model {}
CommentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "c_id",
    },
    content: { type: DataTypes.TEXT, field: "c_content" },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "comments",
  },
);
