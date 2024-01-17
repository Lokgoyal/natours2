const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');



// Handlers
exports.signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
        name : req.body.name,
        email : req.body.email,
        photo : req.body.photo,
        password : req.body.password,
        passwordConfirm : req.body.passwordConfirm
    });

    res.status(201).json({
        status : 'success',
        data : { user : newUser }
    });
});



exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;
    if(!email || !password) return next( new AppError(`Please provide your credentials to login!`, 400) );

    const currentUser = await User.findOne({ email }).select('+password');
    if(!currentUser || !(await currentUser.matchPassword(password, currentUser.password))) return next( new AppError('Invalid credentials!', 401) );

    const authToken = jwt.sign({ id : currentUser._id }, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES });
    res.status(200).json({
        status : 'success',
        token : authToken
    });
});