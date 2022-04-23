const { Router } = require('express');
const fetch = require("cross-fetch");
const {User, Especialidad} = require('../db');
const {Sequelize}= require("sequelize");
const Op=Sequelize.Op;
const jwt = require('jsonwebtoken');
const authToken = require('../middlewares/authToken.js');
const authTokenAdmin = require('../middlewares/authTokenAdmin.js');
const authTokenGet = require('../middlewares/authTokenGet.js');


const router = Router();

router.post('/newSpeciality', authToken, async (req, res)=>{
    let {name, description} =  req.body;
    try{
        if(!name || !description){
            return res.status(404).send({error: "Please complete all the fields"})
        }else{
                const createSpeciality = await Especialidad.create({
                    name,
                    description
                });
                res.json({
                    mensaje: "Speciality created",
                    speciality: createSpeciality
                })                  
            }            
        }catch{
            res.status(404).send({error: "Something wrong creating a new speciality"})
        }
});



router.get('/getSpecialities', authTokenGet, async (req, res)=>{

    try{
        const search = await Especialidad.findAll();
        return res.status(200).json(search)
    }catch(err){
         console.log(err)
    };
})
        
    

router.put('/updateSpeciality', async (req, res)=>{
    let {id, name, description} = req.body;

    try{
        const search = await Especialidad.findOne({where: {id: id}});
        if(!search){
            res.status(404).send({error: "The Client ID doesnt exist :("})
        }else{
            const updateSpeciality = await Especialidad.update(
                {
                    name,
                    description
                },
                {
                    where: {id: id}
                }
            );
            res.json(updateSpeciality);
        }
    }catch{
        res.status(404).send({error: "Something wrong editing a Especiality :("})
    }
});


router.post('/getSpecialityById',authTokenAdmin, async (req, res)=>{
    let {id} = req.body;
    try{
        const search = await Especialidad.findOne({where: {id: id}});
        if(!search){
            res.status(404).send({error: "The Especiality doesnt exist :("})
        }else{
            res.json(search)
        }
    }catch{
        res.status(404).send({error: "Something wrong editing a speciality :("})
    }

});




router.post('/register', async (req, res)=>{
    let {username, password, account}= req.body;

    if(!username || !password || !account){
        res.status(404).send({error: "You must complete all the fields"})
    }else{
        const createUser = await User.create({
            username,
            password,
            account
        });
        res.json(createUser)
    };
});

router.post('/login', async (req, res)=>{
    let {username, password}= req.body;
    if(!username || !password){
        res.status(404).send({error: "You must complete all the fields"})
    }else{
        const search = await User.findOne({where: {username: username, password: password}});
        if(!search){
            res.status(404).send({error: "User or password incorrect"})
        }else{
            jwt.sign({user: search}, 'secretkey', {expiresIn: '8h'}, (err, token)=>{
                res.json({
                    token, 
                    user: search
                }) 
            })
        };
    }
})







module.exports = router;