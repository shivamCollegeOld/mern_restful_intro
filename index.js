const express = require('express');
const path = require('path')
const app = express();
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    },
];

app.get('/comments', (req,res) => {
    res.render('comments/index', {comments});
});

app.post('/comments', (req,res) => {
    const newComment = req.body;
    comments.push({
        id: uuid(),
        username: newComment.username,
        comment: newComment.cmt,
    });
    res.redirect('/comments');
});

app.get('/comments/:id', (req,res) => {
    const {id} = req.params;
    const cmt = comments.find(c => c.id===id);
    res.render('comments/show', {cmt});
});

app.delete('/comments/:id', (req,res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id!==id);
    res.redirect('/comments');
});

app.patch('/comments/:id', (req,res) => {
    const {newComment} = req.body;
    console.log(newComment);
    const {id} = req.params;
    let foundComment = comments.find(c => c.id===id);
    foundComment.comment = newComment;
    res.redirect('/comments');
});

app.listen(8888, () => {
    console.log("Listening on PORT 8888");
});