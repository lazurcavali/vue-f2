const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// GET posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// ADD posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        isChecked: false
    });
    res.status(200).send();
});

// UPDATE posts
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const posts = await loadPostsCollection();
    await posts.updateOne({
        _id: new mongodb.ObjectID(id)
    }, {
        "$set": {
            isChecked: req.body.isChecked
        }
    },
    { new: true }, (error, result) => {
    res.status(200).send();
    });
});

// DELETE posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://vali123:vali123@vueproject-sfur0.mongodb.net/test?retryWrites=true', {
        useNewUrlParser : true
    });

    return client.db('vueproject').collection('posts');
}

module.exports = router;