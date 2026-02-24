import { sequelize } from "../../DB/connection.db.js";
import { UserModel, PostModel, CommentModel } from "../../DB/model/index.js";

export const createPost = async (inputs) => {
  const { title, content, userId } = inputs;
  const author = await UserModel.findByPk(userId);
  if (!author) {
    throw new Error("invalid author id", { cause: { status: 404 } });
  }
  const post = new PostModel({ title, content, userId });
  await post.save();
  return post;
};

export const deletePost = async (postId, inputs, { force = false } = {}) => {
  const { userId } = inputs;
  const post = await PostModel.findByPk(postId);
  if (!post) {
    throw new Error("Post not found", { cause: { status: 404 } });
  }
  if (post.userId !== userId) {
    throw new Error("You are not authorized to delete this post.");
  }
  await post.destroy({ force });
  return post;
};

export const getAllPosts = async () => {
  const post = await PostModel.findAll({
    attributes: ["id", "title"],
    include: [
      { model: UserModel, attributes: ["id", "name"] },
      { model: CommentModel, attributes: ["id", "content"] },
    ],
  });
  return post;
};

export const getPostsAndCounts = async () => {
  const post = await PostModel.findAll({
    attributes: [
      "id",
      "title",
      [sequelize.fn("COUNT", sequelize.col("comments.c_id")), "commentCount"],
    ],
    include: [{ model: CommentModel, attributes: [] }],
    group: ["posts.p_id", "posts.p_title"],
  });
  return post;
};
