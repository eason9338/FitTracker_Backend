const Record = require('../models/Record');

exports.getRecord = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const records = await Record.find({user: userId})
            .populate('user', 'name')
            .populate('exercises.exercise')
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            data: records
        })
    } catch (error) {
        next(error);
    }
}