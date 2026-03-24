const airTickets = require('../Models/airTickets');

const createTicket = async(req, res)=>{
    try{
        const newTicket = new airTickets(req.body)

        const savedTicket = await newTicket.save();


        res.status(201).json({
            message:"request end successfully!",
            data:savedTicket
        });      
    }
    catch(error){
        res.status(400).json({
            message:"Error creating request",
            eoorr:error.message

        })
    }

};


const getAllTickets = async(req, res)=>{
    try{
        const tickets = await airTickets.find();
        res.status(200).json(tickets);
    }
    catch(error){
        res.status(500).json({mesage:error.message});
    }
}

const getTicketById = async(req, res)=>{
    try {
        const { id } = req.params;
        const ticket = await airTickets.findById(id);

        if(!ticket){
            return res.status(404).json({ message: "Ticket not found" });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};


const updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updated = await airTickets.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );
        if(!updated) return res.status(404).json({ message: "Ticket not found" });

        res.status(200).json({ message: "Status updated", data: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createTicket, getAllTickets, getTicketById, updateTicketStatus};