import { Router } from "express";

import {
  createComments,
  findCommentOrCreate,
  getCommentsDetailsById,
  getNewestComments,
  searchComments,
  updateComment,
} from "./comment.service.js";
const router = Router();

router.post("/", async (req, res, next) => {
  const result = await createComments(req.body);
  return res.status(201).json({ message: "Comments Created" });
});

router.patch("/:commentId", async (req, res, next) => {
  const result = await updateComment(req.params.commentId, req.body);
  return res.status(200).json({ message: "Comments Updated" });
});

router.post("/find-or-create", async (req, res, next) => {
  const comment = await findCommentOrCreate(req.body);
  return res.status(201).json({ message: "Done", comment });
});

router.get("/search", async (req, res, next) => {
  const comments = await searchComments(req.query);
  return res
    .status(200)
    .json({ message: "Done", count: comments.length, comments });
});

router.get("/newest/:postId", async (req, res, next) => {
  const comments = await getNewestComments(req.params.postId);
  return res
    .status(200)
    .json({ message: "Done", count: comments.length, comments });
});

router.get("/details/:id", async (req, res, next) => {
  const comment = await getCommentsDetailsById(req.params.id);
  return res.status(200).json({ message: "Done", comment });
});
export default router;
