const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('api/posts/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('api/posts/add', async (req,res) => {
  try{
    const {_id, title, email, publishDate, editDate, status, content, picture, price, phone, localisation} = req.body;
    const newPost = new Post ({_id : _id, title: title, email: email, publishDate: publishDate, editDate: editDate, status: status, content: content, picture: picture, price: price, phone: phone, localisation: localisation});
    await newPost.save();
    res.json({ message: 'Wszystko git, post dodany'});
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
