// setup database Models
var db = require("../models");

module.exports = app => {

    app.get("/api/workouts", function (req, res) {
        db.Workout.find()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    });

    app.post("/api/workouts", function (req, res) {
        console.log("API-Route LINE 17: ");
        console.log(req)
        let newWorkout = req.body;
        db.Workout.create(newWorkout)
            .then( dbWorkout => res.json(dbWorkout))
            .catch(err => {
                console.log("err", err)
                res.json(err)
            })
    });

    app.put("/api/workouts/:id", ({ body, params }, res) => {
        console.log("API-Routes, Line 29")
        console.log(params.id);
        console.log(body);
        console.log(params);
        db.Workout.findByIdAndUpdate(
            params.id,
            { $push: { exercises: [body] } },
            { new: true }
        )
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                console.log("err", err)
                res.json(err)
            })
    });

    app.get("/api/workouts/range", (req, res) => {
        
        db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

}