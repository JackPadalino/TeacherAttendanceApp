const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { User,UserClass,Class,Absence,Message,Day,Coverage } = require("../db");

// GET localhost:3000/api/users/userId
router.get('/:userId',async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId,{
            include:[Class]
        });
        res.send(user);
    }catch(error){
        next(error);
    };
});

// PUT localhost:3000/api/users/:classId
router.put('/:userId',async(req, res, next) => {
    const notFoundMessage = 'The object you are trying to update does not exist!';
    try {
        // updating the user
        if(req.body.teacherInfo){
            const userData = {
                firstName:req.body.teacherInfo.firstName,
                lastName:req.body.teacherInfo.lastName,
                phoneNumber:req.body.teacherInfo.phoneNumber
            };
            const userToUpdate = await User.findByPk(req.params.userId);
            if(!userToUpdate) throw new Error(notFoundMessage);
            await userToUpdate.update(userData);
        };
        // updating the user's classes
        if(req.body.newClassInfo){
            const classData = {
                classId:req.body.newClassInfo.classId
            };
            const classToAdd = await Class.findByPk(classData.classId);
            if(!classToAdd) throw new Error(notFoundMessage);
            await UserClass.create({userId:req.params.userId,classId:classToAdd.id});
        };
        // adding an extra period to the user's schedule
        if(req.body.newExtraPeriodInfo){
            const newClassData = {
                name:req.body.newExtraPeriodInfo.className,
                school:req.body.newExtraPeriodInfo.school,
                period:req.body.newExtraPeriodInfo.period,
                letterDays:req.body.newExtraPeriodInfo.letterDays
            };
            const newClass = await Class.create(newClassData);
            await UserClass.create({userId:req.params.userId,classId:newClass.id});
        };
        res.sendStatus(200);
    }catch(error){
        if(error.message===notFoundMessage){
            return res.status(404).send({message:notFoundMessage});
        }
        next(error);
    };
});

// GET localhost:3000/api/users
router.get('/',async(req, res, next) => {
    try {
        const users = await User.findAll({
            include:[Class,Coverage,Absence],
            order:[
                ['lastName','ASC']
            ]
        });
        res.send(users);
    }catch(error){
        next(error);
    };
});

// GET localhost:3000/api/users
router.post('/',async(req, res, next) => {
    try {
        await User.create(req.body);
        res.sendStatus(200);
    }catch(error){
        next(error);
    };
});

// DELETE localhost:3000/api/users/
router.delete('/:userId',async(req,res,next)=>{
    const notFoundMessage = 'The object you are trying to delete does not exist!';
    try{
        const userToDelete = await User.findByPk(req.params.userId);
        if(!userToDelete) throw new Error(notFoundMessage);
        await userToDelete.destroy();
        res.sendStatus(200);
    }catch(error){
        if(error.message===notFoundMessage){
            return res.status(404).send({message:notFoundMessage});
        }
        next(error);
    };
});

module.exports = router;