const { JobPost } = require("../models");

const getAllJobPost = async (req, res) => {
  try {
    const jobPosts = await JobPost.findAll();
    console.log("Fetched job posts:", jobPosts);
    res.json(jobPosts);
  } catch (error) {
    console.error("Error fetching job posts:", error);
    res.sendStatus(500);
  }
};

const getJobPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobPost = await JobPost.findByPk(id);
    if (jobPost) {
      res.json(jobPost); 
    } else {
      res.sendStatus(404); 
    }
  } catch (error) {
    console.error("Error fetching job post:", error);
    res.status(500).json({ error: "Failed to fetch job post." });
  }
};


const createJobPost = async (req, res) => {
  try {
    const {
      position,
      about,
      requirements,
      responsibilities,
      skills,
      location,
      jobType,
      experience,
    } = req.body;

    if (
      !position ||
      !about ||
      !requirements ||
      !responsibilities ||
      !skills ||
      !location ||
      !jobType ||
      !experience
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const jobPost = await JobPost.create({
      position,
      about,
      requirements,
      responsibilities,
      skills,
      location,
      jobType,
      experience,
    });

    console.log("Job post created:", jobPost);

    // Send a success response
    res.status(201).json(jobPost);
  } catch (error) {
    console.error("Error creating job post:", error);
    // Send an error response
    res.status(500).json({ error: "Failed to create job post." });
  }
};

const editJobPost = async (req, res) => {
  const { id } = req.params;
  const {
    position,
    about,
    requirements,
    responsibilities,
    skills,
    location,
    jobType,
    experience,
  } = req.body;

  try {
    const jobPost = await JobPost.findOne({ where: { id } });

    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found." });
    }

    jobPost.position = position;
    jobPost.about = about;
    jobPost.requirements = requirements;
    jobPost.responsibilities = responsibilities;
    jobPost.skills = skills;
    jobPost.location = location;
    jobPost.jobType = jobType;
    jobPost.experience = experience;

    await jobPost.save();

    res.json(jobPost);
  } catch (error) {
    console.error("Error updating job post:", error);
    res.sendStatus(500);
  }
};

const deleteJobPost = async (req, res) => {
  try {
    const { id } = req.params;
    await JobPost.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getAllJobPost,
  getJobPostById,
  createJobPost,
  editJobPost,
  deleteJobPost,
};
