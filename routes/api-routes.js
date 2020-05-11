// setup database Models
var db = require("../models");

module.exports = app => {
    //Create Workout
    app.post("/api/workouts", ({body}, res) => {
        db.Workout.create(body)
        .then(({_id}) => db.Workout.findOneAndUpdate({}, {$push:{exercises}}))
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    })

    // Get Last Workout
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // Add an exercise
    app.put("/api/workouts/:id", ({body}, res) => {
        console.log('api-routes LINE 30');
        console.log(body, params);
        let workoutsID = params.id;

        let pastExercises = [];
        // get all the existing exercises
        db.Workout.find({_id: workoutID})
            .then(dbWorkout => {
                pastExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);

                let allExercises = [...savedExercises, body]
                console.log(allExercises)
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });
        
        let updateWorkout = exercises => {
            db.Workout.findByIdAndUpdate(workoutID, {exercises: exercises}, function(err, doc) {
                if(err) {
                    console.log(err);
                }
            });
        };
    });

    // Show Stats
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    });

// END of MODULE EXPORTS
};