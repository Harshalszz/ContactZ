const express = require('express');
const router = express.Router()

const {getContact,getContactbyID,createContact,updateContact,deleteContact} = require('../controllers/contactsController');
const validateToken = require('../middleware/validToken');


router.use(validateToken)
router.route('/').get(getContact).post(createContact)

router.route('/:id').get(getContactbyID).put(updateContact).delete(deleteContact);

// router.route('/').post(createContact)

// router.route('/:id').put(updateContact)

// router.route('/:id').delete(deleteContact)
module.exports = router