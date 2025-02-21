const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db;
MongoClient.connect(MONGO_URI)
.then(client => {
   db = client.db('Video_Library');
  console.log('✅ Connected to MongoDB');
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
});

// Global error handler for unhandled promise rejections


// Get all admins
app.get("/get-admin", async (req, res) => {
  try {
    const admins = await db.collection("tbladmin").find({}).toArray();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get all videos
app.get("/get-videos", async (req, res) => {
  try {
    const videos = await db.collection("tblvideo").find({}).toArray();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get a single video by ID
app.get("/get-video/:id", async (req, res) => {
  try {
    const video = await db.collection("tblvideo").findOne({ videoid: parseInt(req.params.id) });
    video ? res.json(video) : res.status(404).json({ msg: "Video not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Filter videos by category
app.get("/filter-video/:categoryid", async (req, res) => {
  try {
    const videos = await db.collection("tblvideo").find({ categoryid: parseInt(req.params.categoryid) }).toArray();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Edit a video
app.put("/edit-video/:id", async (req, res) => {
  try {
    const updatedVideo = await db.collection("tblvideo").updateOne(
      { videoid: parseInt(req.params.id) },
      { $set: req.body }
    );
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete a video
app.delete("/delete-video/:id", async (req, res) => {
  try {
    const result = await db.collection("tblvideo").deleteOne({ videoid: parseInt(req.params.id) });
    result.deletedCount > 0 ? res.json({ msg: "Video deleted" }) : res.status(404).json({ msg: "Video not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Add a video
app.post("/add-video", async (req, res) => {
  try {
    const video = { ...req.body, videoid: parseInt(req.body.videoid), categoryid: parseInt(req.body.categoryid) };
    const result = await db.collection("tblvideo").insertOne(video);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Client-side error' });
  }
});

// Get all categories
app.get("/get-categories", async (req, res) => {
  try {
    const categories = await db.collection("tblcategory").find({}).toArray();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Add a category
app.post("/add-category", async (req, res) => {
  try {
    const category = { ...req.body, categoryid: parseInt(req.body.categoryid) };
    const result = await db.collection("tblcategory").insertOne(category);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Client-side error' });
  }
});

// Edit a category
app.put("/edit-category/:id", async (req, res) => {
  try {
    const updatedCategory = await db.collection("tblcategory").updateOne(
      { categoryid: parseInt(req.params.id) },
      { $set: req.body }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: 'Client-side error' });
  }
});

// Delete a category
app.delete("/delete-category/:id", async (req, res) => {
  try {
    const result = await db.collection("tblcategory").deleteOne({ categoryid: parseInt(req.params.id) });
    result.deletedCount > 0 ? res.json({ msg: "Category deleted" }) : res.status(404).json({ msg: "Category not found" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Get all users
app.get("/get-users", async (req, res) => {
  try {
    const users = await db.collection("tblusers").find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: 'Client-side error' });
  }
});

// Get a user by ID
app.get("/get-user/:userid", async (req, res) => {
  try {
    const user = await db.collection("tblusers").findOne({ userid: req.params.userid });
    user ? res.json(user) : res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(400).json({ error: 'Client-side error' });
  }
});

// Register a user
app.post("/register-user", async (req, res) => {
  try {
    const result = await db.collection("tblusers").insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Client-side error' });
  }
});

// Like a video
app.patch("/like/:videoid", async (req, res) => {
  try {
    const result = await db.collection("tblvideo").updateOne(
      { videoid: parseInt(req.params.videoid) },
      { $set: { likes: parseInt(req.body.likes) } }
    );
    res.json({ msg: "Like updated", result });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

app.patch("/dislike/:videoid", async (req, res) => {
  try {
    const result = await db.collection("tblvideo").updateOne(
      { videoid: parseInt(req.params.videoid) },
      { $set: { dislikes: parseInt(req.body.dislikes) } }
    );
    res.json({ msg: "Dislike updated", result });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});