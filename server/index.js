const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const { routes } = require("./routes/routes");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

// routes:-
app.use("/api/v1", routes);

connectDB();
app.listen(PORT, (req, res) => {
  console.log(`app is listening on PORT ${PORT}`);
});
