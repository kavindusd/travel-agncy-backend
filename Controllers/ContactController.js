const Contact = require('../Models/Contacts');

const CreateMessage = async(req, res)=>{
    try{
        const newMessage = new Contact(req.body)

        const savedMessage = await newMessage.save();


        res.status(201).json({
            message:"request end successfully!",
            data:savedMessage
        });      
    }
    catch(error){
        res.status(400).json({
            message:"Error creating request",
            eoorr:error.message

        })
    }

};


const getAllMessages = async(req, res)=>{
    try{
        const tickets = await Contact.find();
        res.status(200).json(tickets);
    }
    catch(error){
        res.status(500).json({mesage:error.message});
    }
}

const updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true } 
        );

        if (!updatedContact) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
};

const deleteMessage = async (req, res) =>{
    try {
        const {id } = req.params;
        const deletedMessage = await Contact.findByIdAndDelete(id);

        if(!deletedMessage){
            return res.status(404).json({message:"Message not found"});
        }   

        res.status(200).json({Message:"Message deleted successfully"});
    } catch (error) {

        re.status(500).json({message:"Error deleting message", error:error.message});
    }
};

module.exports = {CreateMessage, getAllMessages, updateContactStatus,deleteMessage};