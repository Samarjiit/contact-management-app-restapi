const express = require('express');
const router = express.Router(); // router is a middleware function that handles HTTP requests based on the request method and URLxpress.Router() function returns a router object that can be used to define routes for a specific part of the API or application. For example, you could create a router to handle all the routes for a specific resource like /users.Once you have created a router object using express.Router(), you can define routes for that router using HTTP methods like get, post, put, delete

const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.route('/').get(getContacts);  // //enter point api/contacts ke bad ye show hoga 
router.route('/').post(createContact);

router.route('/:id').get(getContact);

router.route('/:id').put(updateContact);
router.route('/:id').delete(deleteContact);

module.exports = router;
