import { Router } from "express";
import { profile, updateProfile, getProfile } from "./user.service.js";
const router = Router();

router.get("/by-email", async (req, res, next) => {
  const result = await profile(req.query.email);
  return res.status(200).json({ message: "Profile", result });
});

router.put("/:userId", async (req, res, next) => {
  const result = await updateProfile(req.params.userId, req.body);
  return res
    .status(200)
    .json({ message: "User created or updated successfully", result });
});

router.get("/:userId", async (req, res, next) => {
  const result = await getProfile(req.params.userId);
  return res.status(200).json({ message: "Done Successfully", result });
});
export default router;
