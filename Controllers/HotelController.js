const Hotels = require('../Models/Hotels');

const createBooking = async(req, res)=>{
    try{
        const newBook = new Hotels(req.body)

        const savedBook = await newBook.save();


        res.status(201).json({
            message:"request end successfully!",
            data:savedBook
        });      
    }
    catch(error){
        res.status(400).json({
            message:"Error creating request",
            eoorr:error.message

        })
    }

};


const getAllBooking = async(req, res)=>{
    try{
        const books = await Hotels.find();
        res.status(200).json(books);
    }
    catch(error){
        res.status(500).json({mesage:error.message});
    }
}

const getBookingById = async(req, res)=>{
    try {
        const { id } = req.params;
        const book = await Hotels.findById(id);

        if(!book){
            return res.status(404).json({ message: "Booking not found" });
        }

        
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};


const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updated = await Hotels.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true } // Returns the updated document
        );

        if (!updated) return res.status(404).json({ message: "Booking not found" });

        res.status(200).json({ message: "Status updated", data: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createBooking, getAllBooking, getBookingById, updateBookingStatus};