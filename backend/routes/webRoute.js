import express from 'express';
import {Web} from'../models/webModel.js';
const router=express.Router();

router.post('/',async(request,response)=>{
    try{
    if(
    !request.body.name || 
    !request.body.price ||
     !request.body.description
    || !request.body.image
    )
    {
        return response.status(400).send({message:'send all required fieldss : name,price,image,description',});
    }
    const newWeb = await Web.create({
        name: request.body.name,
        price: request.body.price,
        image: request.body.image,
        description: request.body.description,
    }
    );
    
    
    return response.status(201).send(newWeb);
    }catch(error){
        console.log(error.message);
        return response.status(500).send({ message: 'Internal server error' });
    }
    });
    
router.get('/',async(request,response)=>{
       try{
    const webs = await Web.find({});
    return response.status(200).json({count: webs.length, data: webs});
       }catch(error){
        console.log(error.message);
        return response.status(500).send({ message: error.message});
       }
    });
    
router.get('/:id',async(request,response)=>{
        try{
     const {id}=request.params;
     const webs = await Web.findById(id);
     return response.status(200).json({webs});
        }catch(error){
         console.log(error.message);
         return response.status(500).send({ message: error.message});
        }
     });
    
router.put('/:id',async(request,response)=>{
    try{
        if(
            !request.body.name || 
            !request.body.price ||
             !request.body.description
            || !request.body.image
            ){
                return response.status(400).send({message:'send all required fields:name,price,image,description'});
            }
            const{id}=request.params;
            const result =await Web.findByIdAndUpdate(id, request.body);
            if(!result){
                return response.status(404).json({message:'Web not found'});
    
            }
            return response.status(200).send({message:'Web updated successfully'})
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
    });
    
router.delete('/:id',async(request,response)=>{
    try{
    const{id}=request.params;
    const result=await Web.findByIdAndDelete(id);
    if(!result){
        return response.status(404).json({message:'Web not found'});
    }
    return response.status(200).send({message:'Web deleted successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    
    }
    
    });
    export default router;