const express = require("express");
const { Sequelize } = require("sequelize");
const router = express.Router();
const { User,Class,UserClass,Coverage } = require("../db");

// POST localhost:3000/api/coverages
router.post('/',async(req, res, next) => {
    try {
        const coverageData = {
            classId:req.body.classId,
            dayId:req.body.dayId,
            userIds:req.body.userIds,
        };
        const foundCoverages = await Coverage.findAll({
            where:{
                classId:coverageData.classId,
                dayId:coverageData.dayId
            }
        })
        foundCoverages.forEach(async(coverage)=>{
            await coverage.destroy();
        });
        coverageData.userIds.forEach(async(userId)=>{
            await Coverage.create({
                classId:coverageData.classId,
                dayId:coverageData.dayId,
                userId:userId
            });
        })
        res.sendStatus(200);
    }catch(error){
        next(error);
    };
});

// DELETE localhost:3000/api/coverages
router.delete('/:classId/:userId/:dayId',async(req, res, next) => {
    try {
        const foundCoverage = await Coverage.findOne({
            where:{
                classId:req.params.classId,
                userId:req.params.userId,
                dayId:req.params.dayId
            }
        });
        if(foundCoverage) await foundCoverage.destroy();
        res.sendStatus(200);
    }catch(error){
        next(error);
    };
});

// GET localhost:3000/api/coverages
router.get('/',async(req, res, next) => {
    try {
        const coverages = await Coverage.findAll();
        res.send(coverages);
    }catch(error){
        next(error);
    };
});

module.exports = router;