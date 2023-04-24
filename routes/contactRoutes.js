const express = require("express");
const router = express.Router();
//getting access from contact constroller
const { 
    getContacts, 
    getContact, 
    updateContact, 
    createContact, 
    deleteContact  } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
 
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;