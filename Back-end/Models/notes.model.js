const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({

    title:{type:String,required:true},
    notes:{type:String,required:true},

})

module.exports = mongoose.model("notes",notesSchema)