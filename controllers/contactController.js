const asyncHandler = require('express-async-handler');
//we need not tot use try catch everytine  whnever exceotion is occur it going to pass it to the error handler
const Contact = require('../models/contactModel');
//@desc getall contacts
//route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  // res.status(200).json({ message: 'get all contacts ' });
  res.status(200).json(contacts);
});

//@desc create tcontacts
//route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log('the request body is :', req.body);

  const [name, email, phone] = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('all fields are manditory!');
  }
  const contact = await Contact.create({
    //create a new contact
    name,
    email,
    phone,
  });
  res.status(201).json(contact);

  //res.status(201).json({ message: 'create contacts ' });
});

//@desc create tcontacts
//route get /api/contacts
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('contact not foound ');
  }
  //enter point api/contacts ke bad ye show hoga
  res.status(200).json(contact); //covert the respone into json format
});

//@desc create tcontacts
//route put /api/contacts
//@access public
const updateContact = asyncHandler(async (req, res) => {
  //enter point api/contacts ke bad ye show hoga

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  //res.status(200).json({ message: `update contact for ${req.params.id}` }); //covert the respone into json format
    res.status(200).json(updatedContact); //covert the respone into json format

});

//@desc create tcontacts
//route delete  /api/contacts
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  //enter point api/contacts ke bad ye show hoga
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('contact not foound ');
  }

  await  Contact.remove()
  res.status(200).json(contact); //covert the respone into json format
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
