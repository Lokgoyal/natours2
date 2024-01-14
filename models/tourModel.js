const mongoose = require('mongoose');
const slugify = require('slugify');



// Schema Definition
const tourSchema = new mongoose.Schema({

    name : {
        type : String,
        unique : true,
        min : [8, 'Tour name must be of atleast 8 characters!'],
        max : [40, 'Tour name cannot exceed 40 characters!'],
        required : [true, 'Tour must have name specified!']
    },

    slug : String,

    imageCover : {
        type : String,
        required : [true, 'Tour must have imageCover specified!'],
    },

    duration : {
        type : Number,
        required : [true, 'Tour must have duration specified!']
    },

    difficulty : {
        type : String,
        enum : {
            values : ['easy', 'medium', 'difficult'],
            message : `Tour difficulty must be either easy/medium/difficult !`
        },
        required : [true, 'Tour must have difficulty specified!']
    },

    ratingsAverage : {
        type : Number,
        min : [1, 'Rating must be in range of 1 to 5!'],
        max : [5, 'Rating must be in range of 1 to 5!'],
        default : 4.5
    },

    ratingsQuantity : {
        type : Number,
        default : 0
    },

    maxGroupSize : {
        type : Number,
        required : [true, 'Tour must have maxGroupSize specified!']
    },

    price : {
        type : Number,
        required : [true, 'Tour must have price specified!']
    },

    priceDiscount : {
        type : Number,
        validate : {
            validator : function(curDiscount) { return curDiscount < this.price; },
            message : props => `${props.value} is not a valid discount!`
        }
    },

    images : [String],

    startLocation : {
        type : {
            type : String,
            enum : ['Point'],
            default : 'Point'
        },
        coordinates : [Number],
        description : String,
        address : String
    },

    locations : [{
        type : {
            type : String,
            enum : ['Point'],
            default : 'Point'
        },
        coordinates : [Number],
        description : String,
        address : String,
        day : Number
    }],

    startDates : [Date],

    summary : {
        type : String,
        trim : true,
        required : [true, 'Tour must have summary specified!']
    },

    description : {
        type : String,
        trim : true
    },

    createdAt : {
        type : Date,
        default : Date.now()
    },

    isSecretTour : {
        type : Boolean,
        default : false
    }
});



// Attach Hooks
tourSchema.pre('save', function(next) {
    this.slug = slugify(this.slug, {lower : true});
    next();
});



// Build Model
const Tour = mongoose.model('Tour', tourSchema);



// Export Model
module.exports = Tour;