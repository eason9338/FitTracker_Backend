const Record = require('../models/Record');

exports.createRecord = async (req, res, next) => {
    try {
        const { exercises } = req.body
        const userId = req.user.id
        const currentDate = new Date();

        const formattedExercises = exercises.map((exercise) => ({
            exercise: exercise.id,
            sets: exercise.sets.map((set) => ({
                weight: set.weight,
                reps: set.reps
            }))
        }));

        const newRecord = {
            user: userId,
            date: currentDate,
            exercises: formattedExercises
        }

        const createdRecord = await Record.create(newRecord);

        const populatedRecord = await Record.findById(createdRecord._id)
        .populate('user', 'name')
        .populate('exercises.exercise', 'name');

        res.status(201).json({
            success: true,
            data: {
                record: populatedRecord
            }
        });
    } catch (error) {
        next(error);
    }
}