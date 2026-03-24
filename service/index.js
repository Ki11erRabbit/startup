const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const DB = require('./db.js');
const app = express();

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user_id = await DB.nextUser;

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
        user_id: user_id,
    };
    await DB.addUser(user);
    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    if (field === 'token') {
      return await DB.getUserByToken(value);
    }
    return await DB.getUser(value);
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

//let boards = ["Anime", "Technology", "Video Games", "Culture", "Health & Fitness"];

async function createBoard(name) {
    if (!name) return null;
    if (! await DB.findBoard({ name: name })) return null;

    await DB.addBoard({ name: name });
    return name;
}


async function createPost(userName, board, body_text, image, reply_id) {
    const post_id = DB.nextPost();
    const is_reply = reply_id === undefined ? false : true;
    const post = {
        userName: userName,
        board: board,
        postText: body_text,
        imageBase64: image,
        replies: [],
        post_id: post_id,
        is_reply: is_reply
    };
    if (reply_id !== undefined) {
        await DB.createReplyPost(post, reply_id);
    } else {
      await DB.createPost(post);
    }
    return post;
}

async function getPosts(board) {
    let out = await DB.getBoardPosts(board);
    return out;
}

apiRouter.post('/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: "Existing user" })
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    }
});

apiRouter.post('/login', async (req, res) => {
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

apiRouter.delete('/logout', async (req, res) => {
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


apiRouter.post('/replies', verifyAuth, async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        let index = 0;
        for (const post of posts) {
            if (user.email === post.userName && post.replies.length != 0) {
                index += 1;
            }
        }
        res.send({ replies: index });
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.post('/board', verifyAuth, async (req, res) => {
    const board = req.body.board;
    createBoard(board);
    res.status(200).send();
});

apiRouter.get('/board', async (req, res) => {
    res.status(200).send(JSON.stringify(boards));
});

// Get a board's posts
apiRouter.get('/board/:board', async (req, res) => {
    const board = req.params["board"];
    const posts = await getPosts(board);

    res.send(posts);
});

// Create a post for a board
apiRouter.post('/board/:board', async (req, res) => {
    const board = req.params["board"];
    await createPost(req.body.userName, board, req.body.postText, req.body.imageBase64, req.body.replyId);

    res.status(200).send();

});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});