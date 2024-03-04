const mongoose = require("mongoose") ;

const studentSchema = new mongoose.Schema({
    registration : {
        type: String,
        required:true
    },
    password : {
        type: String,
        required:true
    }
})

const Register = new mongoose.model("Registers", studentSchema) ;

module.exports = Register;