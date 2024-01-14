const Tour = require('./../models/tourModel');



// Handlers
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
    if(!newTour) return next();

    res.status(201).json({
        status : 'success',
        data : { tour : newTour }
    });
};



exports.getTour = async (req, res, next) => {

    const tour = await Tour.findById(req.params.id);
    if(!tour) return;

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
    if(!updatedTour) return;

    res.status(202).json({
        status : 'success',
        data : { tour : updatedTour }
    });
};



exports.deleteTour = async (req, res, next) => {

    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if(!deletedTour) return;

    res.status(204).json({
        status : 'success',
        data : null
    });
};