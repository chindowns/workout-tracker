const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Setup the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to models folder
const db = require("./models")

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useFindAndModify: false });

// Setup Logger
app.use(logger("dev"));

// Static Directory
app.use(express.static("public"));

// Setup to Parse API Request Body as JSON 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes required
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
