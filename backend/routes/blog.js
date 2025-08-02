const express = require('express');
const { getAll, create, update, del } = require('../controllers/blogController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload')


const router = express.Router();
router.use(auth);
router.get('/', getAll);
router.post('/',upload.single('image'), create);
router.put('/:id', update);
router.delete('/:id', del);
module.exports = router;
