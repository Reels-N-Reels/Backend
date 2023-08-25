const express = require("express");
const router = express.Router();
const jobPostsController = require("../controllers/jobPostsController");

router.get("/", jobPostsController.getAllJobPost);
router.get("/:id", jobPostsController.getJobPostById);
router.post("/", jobPostsController.createJobPost);
router.put("/:id", jobPostsController.editJobPost);
router.delete("/:id", jobPostsController.deleteJobPost);

module.exports = router;
