import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import Name from "./models/name.js"

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dotenv.config()

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/greetings";

app.post("/eid", (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    const newName = new Name({ name });
    newName.save()
        .then(() => res.status(201).json({ message: "Name saved successfully" }))
        .catch(err => res.status(500).json({ error: "Failed to save name" }));
})

app.listen(PORT, () => {   
  console.log(`Server is running on http://localhost:${PORT}`)
  mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
})