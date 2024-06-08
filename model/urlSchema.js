const { string, required, number } = require('joi');
const mongoose = require('mongoose');


const urlschema =new  mongoose.Schema({
    shortId :{
        type: String,
        required :true,
        unique : true
    },
    requiredurl:{
        type: String,
        required :true,
    },
    visitHistory :
    [
        {timestamps: {type:Number}}
    ]
},{timestamps:true})

const Url = mongoose.model('url',urlschema);

module.exports = Url
