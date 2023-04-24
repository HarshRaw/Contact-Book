const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route Get /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => { // adding async to avoid the promise  from mongodb
    const contacts = await Contact.find({ user_id: req.user.id });
    
    res.status(200).json(contacts);
});

//and if we are using async than we need try catch method to catch error  or install express async handler
//npm i express-async-handler 

//@desc Create new contacts
//@route Post /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is :",req.body);
    const{name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc get contacts
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Not Found!");
    }
    res.status(200).json(contact);
});


//@desc Update contacts
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Not Found!");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});


//@desc delete contacts
//@route Delete /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => { // still issue in delete function
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Not Found!");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to other user contacts");
    }
    await Contact.deleteOne({ _id: req.params.id }); // resolved
    res.status(200).json(contact);
});

module.exports = { getContacts, getContact, updateContact, createContact, deleteContact };