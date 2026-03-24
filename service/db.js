const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('imageboard');
const userCollection = db.collection('user');
const postCollection = db.collection('posts');
const boardCollection = db.collection('boards');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

async function nextUser() {
  return userCollection.countDocuments();
}

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function addBoard(board) {
  return postCollection.insertOne(board);
}

function findBoard(board) {
  return boardCollection.findOne({ name: board });
}

async function getBoards() {
  const cursor = boardCollection.find({});
  return cursor.toArray();
}

async function nextPost() {
  return postCollection.countDocuments();
}

async function createPost(post) {
  return postCollection.insertOne(post);
}

async function createReplyPost(post, reply_id) {
  createPost(post);
  return postCollection.findOneAndUpdate(
    { post_id: reply_id },
    { $push: { replies: post} }
  );
}

async function getBoardPosts(board) {
  const cursor = postCollection.find({ is_reply: { $ne: true } }).sort({ post_id: 1 });
  return cursor.toArray();
}


module.exports = {
  nextUser,
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  addBoard,
  findBoard,
  getBoards,
  createPost,
  createReplyPost,
  nextPost,
  getBoardPosts,
};
