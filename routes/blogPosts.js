const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const blogPostsController = require("../controllers/blogPostsController");
const { BlogPost } = require("../models");

router.get("/", blogPostsController.getAllBlogPosts);
router.get("/:id", blogPostsController.getBlogPostById);

router.post(
  "/",
  upload.single("headerImage"),
  blogPostsController.createBlogPost
);

router.delete("/:id", blogPostsController.deleteBlogPost);

router.put(
  "/:id",
  upload.single("headerImage"),
  blogPostsController.editBlogPost
);

module.exports = router;
