const express = require('express');
const User = require('../models/User');
const Members = require('../models/Members');

const router = express.Router();

// @params its
router.post('/a' , async (req, res) => {
    try{
        const mem = await Members.findOne({
            name: "listA"
        })
        if (!mem) {
            res.json({message : "list not found"})
        }
        else {
            
            let uName;
            let loop = true;
            while(loop){
                try{
                    const pos = Math.floor(Math.random() * mem.count)
                    const userInList = mem.list[pos];
                    const tempUser = await User.findById(userInList)
                    uName = tempUser.name
                    
                    if (tempUser.its !== req.body.its) {
                        res.json(uName);
                        break
                    }
                    if (mem.count < 2) loop = false
                } catch (e) {
                    console.log(e)
                }
            }
            //console.log(`Final: ${uName}`)
            //res.json(uName)
        }
    } catch (e){
        console.log(e)
    }
    
})

// @params its
router.post('/b' , async (req, res) => {
    try{
        const mem = await Members.findOne({
            name: "listB"
        })
        if (!mem) {
            res.json({message : "list not found"})
        }
        else {
            
            let uName;
            let loop = true;
            while(loop){
                try{
                    const pos = Math.floor(Math.random() * mem.count)
                    const userInList = mem.list[pos];
                    const tempUser = await User.findById(userInList)
                    uName = tempUser.name
                    // console.log(tempUser.its, req.body.its)
                    // console.log(req.body.its)
                    if (tempUser.its !== req.body.its) {
                        res.json(uName);
                        break
                    }
                    if (mem.count < 2) loop = false
                } catch (e) {
                    console.log(e)
                }
            }
            // console.log(`Final: ${uName}`)
            //res.json(uName)
        }
    } catch (e){
        console.log(e)
    }
    
})

module.exports = router;