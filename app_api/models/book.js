const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        img : { 
            type: String,
            required: true
        },
        name : {
            type: String,
            required: true
        },
        author: {
            type :String,
            required:true
        },
        price:{
            type: String,
            required: true
        },
        views: {
            type: Number,
            required: true,
            'default': 0,
            min: 0
        }
    }
);

mongoose.model('Book',bookSchema);