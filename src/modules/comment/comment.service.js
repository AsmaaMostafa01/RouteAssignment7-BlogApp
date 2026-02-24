import { Op } from "sequelize";
import { CommentModel } from "../../DB/model/comment.model.js";
import { UserModel } from "../../DB/model/user.model.js";
import { PostModel } from "../../DB/model/post.model.js";

export const createComments = async (inputs) => {
  if (!Array.isArray(inputs) || inputs.length === 0) {
    throw new Error("No comments to create");
  }
  const comment = await CommentModel.bulkCreate(inputs);

  return comment;
};

export const updateComment = async (commentId, inputs) => {
  const { userId, content } = inputs;
  const comment = await CommentModel.findByPk(commentId);

  if (!comment)
    throw new Error("comment not found", { cause: { status: 404 } });
  if (comment.userId !== userId) {
    throw new Error("You are not authorized to update this comment");
  }
  await CommentModel.update({ userId, content }, { where: { id: commentId } });
  return comment;
};

export const findCommentOrCreate = async (inputs) => {
  const { postId, userId, content } = inputs;
  const [comment, created] = await CommentModel.findOrCreate({
    where: {
      postId,
      userId,
      content,
    },
  });
  return { comment, created };
};

export const searchComments = async (inputs) => {
  const { word } = inputs;
  if (!word) throw new Error("search word is required");
  const comments = await CommentModel.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });
  if (comments.count === 0) {
    throw new Error("no comments found", { cause: { status: 404 } });
  }
  return comments;
};

export const getNewestComments = async (postId) => {
  if (!postId) throw new Error("postId is required");
  const comments = await CommentModel.findAll({
    where: { postId },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
  if (comments.length === 0) {
    throw new Error("No comments found for this post.", {
      cause: { status: 404 },
    });
  }

  return comments;
};

export const getCommentsDetailsById = async (id) => {
  if (!id) throw new Error("Comment id is required");

  const comment = await CommentModel.findByPk(id, {
    attributes: ["id", "content"],
    include: [
      {
        model: UserModel,
        attributes: ["u_id", "u_name", "email"],
      },
      {
        model: PostModel,
        attributes: ["p_id", "p_title", "p_content"],
      },
    ],
  });
  if (!comment) {
    throw new Error("comment not found ", { cause: { status: 404 } });
  }
  return comment;
};
