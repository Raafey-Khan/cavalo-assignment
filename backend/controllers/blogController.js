const Blog = require('../models/Blog');


exports.getPublic = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort('-createdAt')
      .populate('userId', 'username');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch public blogs' });
  }
};


exports.getOwnBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.userId }).sort('-createdAt');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your blogs' });
  }
};


exports.create = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file?.filename;

    const blog = new Blog({
      title,
      content,
      image,
      userId: req.userId,
      createdAt: new Date(),
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create blog' });
  }
};


exports.update = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    blog.title = req.body.title;
    blog.content = req.body.content;
    await blog.save();

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update blog' });
  }
};


exports.del = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await blog.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};
