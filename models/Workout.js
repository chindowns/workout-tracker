const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
    {
        day: {
            $type: Date,
            default: Date.now()
        },
        exercises: [
            {
                type: "String",
                name: "String",
                duration: Number,
                weight: Number,
                reps: Number,
                sets: Number,
                distance: Number
            }
        ]
    },
    {
        typeKey: '$type',
        toJSON: {
            virtuals: true
        }
    }
);

// add dynamically created properties
WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total += exercise.duration;
    },0);
    
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;