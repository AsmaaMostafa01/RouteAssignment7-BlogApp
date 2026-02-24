import { UserModel } from "./user.model.js";
import { PostModel } from "./post.model.js";
import { CommentModel } from "./comment.model.js";

//association
UserModel.hasMany(PostModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PostModel.belongsTo(UserModel, { foreignKey: "userId" });

PostModel.hasMany(CommentModel, { foreignKey: "postId", onDelete: "CASCADE" });
CommentModel.belongsTo(PostModel, { foreignKey: "postId" });

UserModel.hasMany(CommentModel, { foreignKey: "userId", onDelete: "CASCADE" });
CommentModel.belongsTo(UserModel, { foreignKey: "userId" });

export { UserModel, PostModel, CommentModel };
