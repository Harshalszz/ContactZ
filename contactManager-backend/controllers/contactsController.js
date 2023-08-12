const asyncHandler = require('express-async-handler');
const Contact = require('../model/contactModel')

const getContact = asyncHandler(async (req,res)=>{
    console.log(req.user.id)
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts)
});

const getContactbyID= asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    console.log(req.params.id)
    console.log(JSON.stringify(contact))
    if(!contact){
        res.status(404);
        throw new Error('Contact not found')
    }
    res.status(200).send(contact)
});


const createContact =asyncHandler(async (req,res)=>{
    console.log(req.body)
    const {name, email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error('All fields are required')
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).send(contact)
});

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("You are not authorized to update this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).send(updatedContact);
});

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    console.log(contact)
    //contact.remove()
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("You are not authorized to delete this contact");
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).send(contact)
});


module.exports = {
    getContact,
    getContactbyID,
    createContact,
    updateContact,
    deleteContact
}