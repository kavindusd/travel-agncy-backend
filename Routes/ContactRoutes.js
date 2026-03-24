const express= require('express');
const router = express.Router();
const {CreateMessage, getAllMessages, updateContactStatus, deleteMessage} = require('../Controllers/ContactController')

//  /api/contacts/message
router.post('/message',CreateMessage);

//  /api/contacts/inbox
router.get('/inbox', getAllMessages);

router.patch('/status/:id',updateContactStatus);

router.delete('/:id', deleteMessage);



module.exports = router;