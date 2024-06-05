const { string, required } = require('joi');
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
    }
},{timestamps:true})

exports.urlmodel = mongoose.model('url-shortner',urlschema);


