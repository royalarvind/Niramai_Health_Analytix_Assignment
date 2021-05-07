const express = require('express')
const Report = require('../models/report')
const mongoose = require('mongoose')
const router = new express.Router()
const request = require('request')

router.get('/report/:id', async(req,res)=>{
    try {
        const report = await Report.findOne({case_id:req.params.id})
        if(!report){
            return res.status(404).send()
        }
        res.send(report)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router