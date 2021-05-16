const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        console.log("Connection Successful!");
    })
    .catch(err => {
        console.log("Connection Failed!");
    })

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

let comments = [
    {
        // id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        // id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        // id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        // id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    },
];

async function addInitialComments(initialComments){
    try{
        let res = await Comment.insertMany(initialComments);
        console.log("Success");
        console.log(res);
    } catch (err) {
        console.log("Failure!");
        console.log(err);
    }
}

addInitialComments(comments);