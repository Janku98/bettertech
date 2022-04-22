const { Router } = require('express');
const fetch = require("cross-fetch");
const {User, Especialidad} = require('../db');
const {Sequelize}= require("sequelize");
const Op=Sequelize.Op;


const router = Router();

router.post('/newSpeciality' , async (req, res)=>{
    let {name, description} =  req.body;
    try{
        if(!name || !description){
            return res.status(404).send({error: "Please complete all the fields"})
        }else{
            const createSpeciality = await Especialidad.create({
                name,
                description
            });
            res.json(createSpeciality)
        };

    }catch{
        res.status(404).send({error: "Something wrong creating a new speciality"})
    }
});


router.get('/getSpecialities', async (req, res)=>{
    const search = await Especialidad.findAll();
    if(!search){
        return res.status(404).send({error: "Table not found :("})
    }else{
        return res.status(200).json(search)
    }
});


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


router.get('/getSpecialityById', async (req, res)=>{
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
    let {username, password}= req.body;

    if(!username || !password){
        res.status(404).send({error: "You must complete all the fields"})
    }else{
        const createUser = await User.create({
            username,
            password
        });
        res.json(createUser)
    };
});

router.get('/login', async (req, res)=>{
    let {username, password}= req.body;
    if(!username || !password){
        res.status(404).send({error: "You must complete all the fields"})
    }else{
        const search = await User.findOne({where: {username: username, password: password}});
        if(!search){
            res.status(404).send({error: "User or password incorrect"})
        }else{
            res.json(search)
        };
    }
})







module.exports = router;