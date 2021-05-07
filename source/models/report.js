const mongoose = require('mongoose')
const ReportSchema = mongoose.Schema({
    case_id:{
        type: String,
    },
    tumor_site:{
        type: String,
    },
    BMI:{
        type: Number,
    },
    height_in_cm:{
        type: Number,
    },
    weight_in_kg:{
        type: Number,
    }
})

const Report = mongoose.model('Report', ReportSchema)
module.exports = Report