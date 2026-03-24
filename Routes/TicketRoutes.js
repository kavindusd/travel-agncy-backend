const express= require('express');
const router = express.Router();
const {createTicket, getAllTickets, getTicketById, updateTicketStatus} = require('../Controllers/airTicketController')

//  /api/tickets/book
router.post('/book',createTicket);

//  /api/tickets/all
router.get('/all', getAllTickets);

//  /api/tickets/:id
router.get('/:id', getTicketById);

router.patch('/status/:id',updateTicketStatus);


module.exports = router;