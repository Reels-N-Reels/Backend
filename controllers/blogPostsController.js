const { BlogPost } = require("../models");
const fs = require("fs-extra");

const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll();
    res.json(blogPosts);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findByPk(id);
    if (blogPost) {
      res.json(blogPost);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Failed to fetch blog post." });
  }
};

const createBlogPost = async (req, res) => {
  try {
    const { title, author, content, date } = req.body;
    const headerImage = req.file ? req.file.path : null; // Use the file path here

    if (!title || !author || !content || !date || !headerImage) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const blogPost = await BlogPost.create({
      title,
      author,
      content,
      date,
      headerImage,
    });
    res.status(201).json(blogPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.sendStatus(500);
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    await BlogPost.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const editBlogPost = async (req, res) => {
  const { id } = req.params;
  const { title, author, content, date } = req.body;
  const headerImage = req.file ? req.file.path : null;
  try {
    const blogPost = await BlogPost.findOne({ where: { id } });

    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found." });
    }

    if (headerImage && blogPost.headerImage && fs.existsSync(blogPost.headerImage)) {
      fs.unlinkSync(blogPost.headerImage);
    }

    blogPost.title = title;
    blogPost.author = author;
    blogPost.content = content;
    blogPost.date = date;
    blogPost.headerImage = headerImage;

    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  deleteBlogPost,
  editBlogPost,
};
