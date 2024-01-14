const Tour = require('./../models/tourModel');
const AppError = require('./../utils/AppError');



// Handlers (CRUD)
exports.getAllTours = async (req, res, next) => {

    const tours = await Tour.find();
    res.status(200).json({
        status : 'success',
        numTours : tours.length,
        data : { tours }
    });
};



exports.createTour = async (req, res, next) => {

    const newTour = await Tour.create(req.body);
    if(!newTour) return next( new AppError('Unable to create new tour!', 400) );

    res.status(201).json({
        status : 'success',
        data : { tour : newTour }
    });
};



exports.getTour = async (req, res, next) => {

    const tour = await Tour.findById(req.params.id);
    if(!tour) return next( new AppError(`No tour exist with this Id!`, 404) );

    res.status(200).json({
        status : 'success',
        data : { tour }
    });
};



exports.updateTour = async (req, res, next) => {

    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true
    });
    if(!updatedTour) return next( new AppError(`No tour exist with this Id!`, 404) );

    res.status(202).json({
        status : 'success',
        data : { tour : updatedTour }
    });
};



exports.deleteTour = async (req, res, next) => {

    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if(!deletedTour) return next( new AppError(`No tour exist with this Id!`, 404) );

    res.status(204).json({
        status : 'success',
        data : null
    });
};



// Handlers (Analytical)
exports.tourStats = async (req, res, next) => {

    const stats = await Tour.aggregate([
        {
            $match : { ratingsAverage : { $gt : 4.5 } }
        },

        {
            $group : {
                _id : '$difficulty',
                numTours : { $sum : 1 },
                avgRating : { $avg : '$ratingsAverage' },
                numRatings : { $sum : '$ratingsQuantity' },
                avgPrice : { $avg : '$price' },
                maxPrice : { $max : '$price' },
                minPrice : { $min : '$price' }
            }
        },

        {
            $sort : { numTours : -1 }
        },

        {
            $limit : 5
        }
    ]);
    
    res.status(200).json({
        status : 'success',
        data : { stats }
    });
};



exports.monthlyPlan = async (req, res, next) => {

    const { year } = req.params;
    const plan = await Tour.aggregate([

        {
            $unwind : '$startDates'
        },

        {
            $match : { startDates : {
                $gte : new Date(`${year}-01-01`),
                $lte : new Date(`${year}-12-31`)
            }}
        },

        {
            $group : {
                _id : { $month : '$startDates' },
                tours : { $push : '$name' },
                numTours : { $sum : 1 }
            }
        },

        {
            $addFields : { month : '$_id' }
        },

        {
            $sort : {
                numTours : -1,
                month : 1,
            }
        },

        {
            $project : { _id : 0 }
        },

        {
            $limit : 5
        }
    ]);

    res.status(200).json({
        status : 'success',
        data : { plan }
    });
};