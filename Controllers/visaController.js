const Visa = require('../Models/Visa');

const createVisa = async(req, res)=>{
    try{
        const newVisa = new Visa(req.body)

        const savedVisa = await newVisa.save();


        res.status(201).json({
            message:"request send successfully!",
            data:savedVisa
        });      
    }
    catch(error){
        res.status(400).json({
            message:"Error creating request",
            eoorr:error.message

        })
    }

};


const getAllVisa = async(req, res)=>{
    try{
        const visas = await Visa.find();
        res.status(200).json(visas);
    }
    catch(error){
        res.status(500).json({mesage:error.message});
    }
}

const getVisaById = async(req, res)=>{
    try {
        const { id } = req.params;
        const visa = await Visa.findById(id);

        if(!visa){
            return res.status(404).json({ message: "Visa not found" });
        }    
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

const updateVisaStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updated = await Visa.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );
        if(!updated) return res.status(404).json({ message: "Visa not found" });

        res.status(200).json({ message: "Status updated", data: updated });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};




module.exports = {createVisa, getAllVisa, getVisaById, updateVisaStatus};