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

// const corsOptions = {
//   origin: 'http://localhost:5173', // Replace with your frontend's URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//   credentials: true // Allow cookies/auth headers
// };

// app.use(cors(corsOptions));

app.use(
  cors({
    origin: "http://localhost:5173", // URL of your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Include necessary headers
    credentials: true, // Allow cookies and auth headers
  })
);

const PORT = process.env.PORT;

// routes:-
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Namastey Thread Server is running...");
});

connectDB();
app.listen(PORT, (req, res) => {
  console.log(`app is listening on PORT ${PORT}`);
});
