import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
  updatePost,
} from "./fakedb";

const port = 8085;
const octet = 'QWxhZGRpbjpvcGVuIHNlc2FtZQ==';
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, octet, {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, octet);
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  await sleep(2000);
  res.json(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const postId = parseInt(id, 10);
  const foundPost = posts.find((post) => post.id === postId);
  if (!foundPost) {
    res.status(404).json({ error: "Post not found" });
  } else {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, octet);
    const user = findUserById((decodedUser as IDecodedUser).id);
    const email = user.email
    const [author] = email.split("@");
    const details = { ...foundPost, author: author };
    res.json(details);
  }
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
  const incomingPost = req.body;
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

app.put("/api/posts", (req, res) => {
  const incomingPost = req.body;
  updatePost(incomingPost);
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));
