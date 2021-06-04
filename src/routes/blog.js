const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const blogController = require("../controllers/blog");

router.post(
  "/post",
  blogController.upload.single("image"),
  body("title").isLength({ min: 5 }).withMessage("input title minimum 5"),
  body("body").isLength({ min: 5 }).withMessage("input body minimum 5"),
  blogController.createBLogPost
);

router.get("/posts", blogController.getAllBlogPost);
router.get("/post/:postId", blogController.getBlogPostById);
router.put(
  "/post/:postId",
  blogController.upload.single("image"),
  body("title").isLength({ min: 5 }).withMessage("input title minimum 5"),
  body("body").isLength({ min: 5 }).withMessage("input body minimum 5"),
  blogController.updateBlogPost
);
router.delete("/post/:postId", blogController.deleteBlogPost);

module.exports = router;
