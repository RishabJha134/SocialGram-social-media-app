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
app.use(cors({
  origin: 'http://localhost:5173', // Specify the frontend origin
  // methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  credentials: true // Allow cookies/credentials
}));

const PORT = process.env.PORT;

// routes:-
app.use("/api/v1", routes);

connectDB();
app.listen(PORT, (req, res) => {
  console.log(`app is listening on PORT ${PORT}`);
});
