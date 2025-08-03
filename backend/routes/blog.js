// routes/blog.js
const express = require('express');
const {
  getPublic,
  getOwnBlogs,
  create,
  update,
  del,
} = require('../controllers/blogController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();


router.get('/public', getPublic);


router.use(auth);
router.get('/', getOwnBlogs);
router.post('/', upload.single('image'), create);
router.put('/:id', update);
router.delete('/:id', del);

module.exports = router;
