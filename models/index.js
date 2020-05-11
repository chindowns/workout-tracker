// requiring and connecting to the database
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Exporting an object containing all of our models

module.exports = {
    Workout: require("./Workout")
};