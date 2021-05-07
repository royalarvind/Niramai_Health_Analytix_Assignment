const mongoose = require('mongoose')
const request = require('request')
mongoose.connect('mongodb://127.0.0.1:27017/Clinical-report', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

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

const url = 'https://clinicalapi-cptac.esacinc.com/api/tcia/clinical_data/tumor_code/CCRCC'
    request({url, json:true}, async (error,response, body)=>{
        if(error){
            throw new Error('Unable to connect to the api service')
        }else
        {       
            body.forEach(async(data) => {
                const report = new Report({case_id: data.case_id, tumor_site: data.tumor_site, BMI: data.BMI,
                height_in_cm: data.height_in_cm, weight_in_kg: data.weight_in_kg})
                try{
                    await report.save();
                }catch(e){
                    console.log(e)
                }
            })
            
        }
    })