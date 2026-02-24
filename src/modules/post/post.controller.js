import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostsAndCounts,
} from "./post.service.js";
const router = Router();
router.post("/", async (req, res, next) => {
  const result = await createPost(req.body);
  return res.status(201).json({ Message: "Post created successfully", result });
});

router.delete("/:postId", async (req, res, next) => {
  const result = await deletePost(req.params.postId, req.body);
  return res.status(200).json({ Message: "Post deleted", result });
});

router.get("/", async (req, res, next) => {
  const result = await getAllPosts();
  return res.status(200).json({ Message: "Done Successfully", result });
});

router.get("/comment-count", async (req, res, next) => {
  const result = await getPostsAndCounts();
  return res.status(200).json({ Message: "Done Successfully", result });
});
export default router;
