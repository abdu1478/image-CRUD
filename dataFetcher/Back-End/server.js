const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/mern_images")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Image Schema
const imageSchema = new mongoose.Schema({
  name: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("Image", imageSchema);

// Multer Setup
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Upload Endpoint
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded");
    const existingImage = await Image.findOne({ name: req.file.originalname });
    if (existingImage) return res.status(400).send("Image with this name already exists");

    const newImage = new Image({
      name: req.file.originalname,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    if(newImage.image.data.length > 1024 * 1024 * 5) return res.status(400).send("File size exceeds 5MB limit");
    if(!["image/jpeg", "image/png", "image/gif"].includes(newImage.image.contentType)) return res.status(400).send("Unsupported file type");

    await newImage.save();
    res.status(201).send({
      _id: newImage._id,
      name: newImage.name,
      message: "Image uploaded successfully"
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Fetch Image by ID
app.get("/image/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).send("Image not found");

    res.set("Content-Type", image.image.contentType);
    res.send(image.image.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Fetch Image by Name
app.get("/image/name/:name", async (req, res) => {
  try {
    const image = await Image.findOne({ name: req.params.name });
    if (!image) return res.status(404).send("Image not found");

    res.set("Content-Type", image.image.contentType);
    res.send(image.image.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/uploads", async (req, res) => {
  try {
    const result = await Image.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(200).json({ message: "No images to delete." });
    }
    res.status(200).json({ message: `Deleted ${result.deletedCount} images.` });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});