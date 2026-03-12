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
    const user_id = users.length;

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
        user_id: user_id,
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
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: "Existing user" })
    } else {
        const user = createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Get a board's posts
apiRouter.get('/:board', async (req, res) => {
    const board = req.params["board"];
    const posts = await getPosts(board);

    res.send(posts);

});

// Create a post for a board
apiRouter.post('/:board', verifyAuth, async (req, res) => {
    const board = req.params["board"];
    await createPost(req.body.user_id, board, req.body.title, req.body.body_text, req.body.image, req.body.reply_id);

    res.status(200).send();

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});