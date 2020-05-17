const express = require('express');
const User = require('../models/User');
const Members = require('../models/Members');

const router = express.Router();

// @params name
router.post('/addList', (req, res) => {

    const mem = new Members({
        name: req.body.name
    })
    mem
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));

})

router.get('/getAll', (req, res) => {

    User.find().then(users => res.json(users)).catch(e => console.log(e))

})

// @params name, its
router.post('/add', (req, res) => {
    let returnedUser;
    let aList;
    let bList;
    User.findOne({
            its: req.body.its
        })
        .then(user => {
            if (user) {
                res.status(400).json({
                    "message": "This user alerady exist"
                })
            } else {
                const newUser = new User({
                    name: req.body.name,
                    its: req.body.its
                })
                newUser
                    .save()
                    .then(user => {console.log(user)
                        Members.findOne({
                            name: "listA"
                        })
                        .then(mem => {
                            if (!mem) {
                                console.log("member listA not found!")
                            } else {
                                mem.list.push(newUser);
                                mem.count++;
                                mem.save()
                                    .then(rMem => aList = rMem.list)
                                    .catch(err => console.log(`list A error: ${err}`));
                            }
                        });
    
                        Members.findOne({
                                name: "listB"
                        })
                        .then(mem => {
                            if (!mem) {
                                console.log("member listA not found!")
                            } else {
                                mem.list.push(newUser);
                                mem.count++;
                                mem.save()
                                    .then(rMem => bList = rMem.list)
                                    .catch(err => console.log(`list B error: ${err}`));
                            }
                        })
                    
                    })
                    .catch(err => console.log(err));

                

                console.log(aList)
                res.json({message: "okay"})
            }
        });
    
})



// @params its
router.post('/login', async (req, res) => {
    try{
        const foundUser = await User.findOne({its: req.body.its})
        //console.log(req.body.its)
        if (!foundUser){
            res.json({pass : false,
            message: "Access Denied"})
        } else {
            res.json({pass : true,
                message: "Login Sucessfull",
            user : foundUser})
        }
    }catch (e) {
        console.log(e)
    }
})


// @params its, name
router.post('/selectA', async (req, res) => {
    try{
        let returnStuff;
        const selectedUser = await User.findOne({name: req.body.name})
        if (!selectedUser) res.json({message: "user name not found!"})
        else {
            const mem = await Members.findOne({name: "listA"})
            if(!mem){
                res.json({message: "ListA not found!"})
            }
            else{
                //console.log(selectedUser.id)
                if (mem.list.includes(selectedUser.id)){
                    const newList = await mem.list.filter((i) => {return (i != selectedUser.id)})
                    //mem.count -= 1
                    const newMem  = await Members.updateOne({name: "listA"}, {list : newList, count: mem.count-1})
                    //returnStuff.member = newMem;
                    //console.log(newMem)
                    

                    const foundUser = await User.findOne({its: req.body.its})
                    if (!foundUser){
                        res.json({message: "user not found!"})
                    }
                    else {
                        foundUser.a.assigned = true;
                        foundUser.a.name = req.body.name
                        const resp = await foundUser.save();
                        //returnStuff.myuser = resp.toJSON();
                        //console.log(resp)
                        //res.json(foundUser)
                        res.json({pass: true})
                    }
                }
                else {
                    res.json({message: "This user is no longer avalible..."})
                }
            }
            
            
        }
        res.json(returnStuff)


    }catch (e){
        console.log(e)
    }
})

// @params its, name
router.post('/selectB', async (req, res) => {
    try{
        let returnStuff;
        const selectedUser = await User.findOne({name: req.body.name})
        if (!selectedUser) res.json({message: "user name not found!"})
        else {
            const mem = await Members.findOne({name: "listB"})
            if(!mem){
                res.json({message: "ListB not found!"})
            }
            else{
                //console.log(selectedUser.id)
                if (mem.list.includes(selectedUser.id)){
                    const newList = await mem.list.filter((i) => {return (i != selectedUser.id)})
                    //mem.count -= 1
                    const newMem  = await Members.updateOne({name: "listB"}, {list : newList, count: mem.count-1})
                    //returnStuff.member = newMem;

                    const foundUser = await User.findOne({its: req.body.its})
                    if (!foundUser){
                        res.json({message: "user not found!"})
                    }
                    else {
                        foundUser.b.assigned = true;
                        foundUser.b.name = req.body.name
                        const resp = await foundUser.save()
                        //console.log(resp)
                        //returnStuff.user = resp;
                        //res.json(foundUser)
                    }
                }
                else {
                    res.json({message: "This user is no longer avalible..."})
                }
            }
            
            
        }
        // res.json(returnStuff)
        res.json({pass: true})

    }catch (e){
        console.log(e)
    }
})


module.exports = router;