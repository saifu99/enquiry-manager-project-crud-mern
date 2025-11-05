const enquiryModel = require("../models/enquiryModel");

let enquiryInsert=(req,res)=>{
    let {name,email,phone,message}=req.body;
    let enquiry=new enquiryModel({
        name,
        email,
        phone,
        message
    });
    enquiry.save().then(()=>{
        res.send({status:1, message:"Enquiry saved successfully"});

    }).catch((err)=>{
        res.send({status:0, message:"error while saving enquiry", error:err});
})
}

let enquiryList=async(req,res)=>{
    let enquiryList=await enquiryModel.find();
    res.status(200).json({status:1, message:"Enquiry list", data:enquiryList})
}

let enquiryDelete=async(req,res)=>{
    let enquiryId=req.params.id;
    let deleteEnquiry=await enquiryModel.deleteOne({_id:enquiryId});
    res.send({status:1, message:"Enquiry deleted successfully", deleteEnquiry})
}

let enquirySingleRow=async(req,res)=>{
    let enquiryId=req.params.id;
    let findEnquiry=await enquiryModel.findOne({_id:enquiryId});
    res.send({status:1, message:"Enquiry deleted successfully", findEnquiry})
}

let enquiryUpdate=async(req,res)=>{
    let enquiryId=req.params.id;
    let {name,email,phone,message}=req.body;
    let updateObj={
        name,
        email,
        phone,
        message
    };
    let updateRes=await enquiryModel.updateOne({_id:enquiryId}, updateObj);
    res.send({status:1, message:"Enquiry updated successfully", updateRes})
}

module.exports={enquiryInsert, enquiryList, enquiryDelete,enquirySingleRow, enquiryUpdate};
