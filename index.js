const express = require('express');
const path = require('path')
const app = express();
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        console.log("Connection Successful!");
    })
    .catch(err => {
        console.log("Connection Failed!");
    })

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');


const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});

const Comment = mongoose.model('Comment', commentSchema);


app.get('/comments', async (req,res) => {
        try {
            let comments = await Comment.find({}).exec();
            console.log("Data retreived succesfully!");
            res.render('comments/index', {comments});
        } catch (err) {
            console.log("Data retreival failed!");
            res.send("Data could not be retreived");
        }
});

app.post('/comments', async (req,res) => {
    const newComment = new Comment({
        username: req.body.username,
        comment: req.body.comment,
    });
    
    try {
        let val = await newComment.save();
        console.log("Added succesfully!");
        console.log(val);
    } catch (err) {
        console.log("Failed to add!");
    }
    
    res.redirect('/comments');
});

app.get('/comments/:id', async (req,res) => {
    const {id} = req.params;

    try {
        const cmt = await Comment.findById(id).exec();
        console.log("Comment found successfully!");
        res.render('comments/show', {cmt});
    } catch (err) {
        console.log("Error in finding comment!");
    }
});

app.delete('/comments/:id', async (req,res) => {
    const {id} = req.params;

    try {
        let data = await Comment.deleteOne({_id: id}).exec();
        console.log("Deletion successful!");
        res.redirect('/comments');
    } catch (err) {
        console.log("Deletion failed!");
    }
});

app.patch('/comments/:id', async (req,res) => {
    const {newComment} = req.body;
    const {id} = req.params;
    
    try {
        let data = await Comment.findById(id).exec();
        data.comment = newComment;
        await data.save();
        console.log("Comment updation successful!");
        res.redirect('/comments');
    } catch (err) {
        console.log("Comment updation failed!");
    }
});

app.listen(8888, () => {
    console.log("Listening on PORT 8888");
});