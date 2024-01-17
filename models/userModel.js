const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');



// Schema Definition
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true, 'Name must be specified for user!']
    },

    email : {
        type : String,
        unique: true,
        lowercase : true,
        required : [true, 'Email must be specified for user!']
    },

    photo : String,

    password : {
        type : String,
        minLength : [8, 'Password must contain ateast 8 characters!'],
        required : [true, 'Password must be specified for user!']
    },

    passwordConfirm : {
        type : String,
        validate : {
            validator : function(curVal) { curVal == this.password; },
            message : `Passwords are not same, please recheck!`
        },
        required : [true, 'Password confirmation is required for user!']
    }
});




// Attach Hooks
userSchema.pre('save', function(next) {
    if(!this.isModified('password')) return next();

    this.password = bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});



// Build Model
const User = mongoose.model('User', userSchema);



// Exports Model
module.exports = User;