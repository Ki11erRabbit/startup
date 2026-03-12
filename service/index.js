const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

let users = [];

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);
    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

let posts = [];

async function createPost(user_num, board, title, body_text, image, reply_id) {
    const post_id = posts.length;
    const is_reply = reply_id === undefined ? false : true;
    const post = {
        user_num: user_num,
        board: board,
        title: title,
        body_text: body_text,
        image: image,
        replies: [],
        post_id: post_id,
        is_reply: is_reply
    };
    if (reply_id !== undefined) {
        posts[reply_id].replies.push(post);
    }
    posts.push(post);
    return post;
}

async function getPosts(board) {
    let out = [];

    for (const post of posts) {
        if (post.board === board && !post.is_reply) {
            out.push(post);
        }
    }
    return out;
}

apiRouter.post('/auth/create', async (req, res) => {

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});