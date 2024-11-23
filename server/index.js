const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const { routes } = require("./routes/routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://social-graph-sg.vercel.app",
    "https://social-graph-sg.vercel.app/",
    "https://social-gram-social-media-app.vercel.app",
    "https://social-graph-social-media-app.vercel.app/",
    "https://social-graph-social-media-app-git-main-rishab-jha-projects.vercel.app/",
    "https://social-graph-social-media-2rlupkxea-rishab-jha-projects.vercel.app/",
    "https://social-graph-social-media-app.vercel.app",
    "https://social-graph-social-media-app-git-main-rishab-jha-projects.vercel.app",
    "https://social-graph-social-media-2rlupkxea-rishab-jha-projects.vercel.app",
  ], // Add your frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies/auth headers
};

// Use CORS middleware
app.use(cors(corsOptions));

// Handle Preflight Requests (Optional but Recommended)
app.options("*", cors(corsOptions));

// Handle Preflight Requests
// app.options("*", cors(corsOptions));

const PORT = process.env.PORT;

// Routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Namastey Thread Server is running...");
});

// Global Error Handler (Optional, for debugging backend issues)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ msg: "Something went wrong!" });
});

// Connect to Database and Start Server
connectDB();
app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
