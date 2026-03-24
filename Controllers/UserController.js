const Admin = require('../Models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//admin Reg
const register = async (req, res)=>{
    try{
        const {username, password, role, phoneNumber} = req.body;

        const existingAdmin = await Admin.findOne({username});
        if(existingAdmin) return res.status(400).json({message:"This Admin Exist"});
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin =new Admin({
            username,
            hashedPassword,
            role,
            phoneNumber
        });

        await newAdmin.save();
        res.status(201).json({message: "Admin registered successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }   
};

const login = async (req, res)=>{
    try {
        const {username, password} = req.body;

        const admin = await Admin.findOne({username});
        if(!admin) return res.status(401).json({message:"Invalid credentials"});

        const isPasswordValid = await bcrypt.compare(password, admin.hashedPassword);
        if(!isPasswordValid) return res.status(401).json({message:"Invalid credentials"});

        const token = jwt.sign(
            { id:admin._id, role:admin.role},
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );
        res.status(200).json({
            token,
            admin:{
                username:admin.username,
                role:admin.role,
                phoneNumber:admin.phoneNumber
            }
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

const getAgentContactByRole = async (req, res) => {
    try {
        const { role } = req.params; // Get role from URL (e.g., 'hotel_agent')

        // 1. Find an admin with the specific role
        const agent = await Admin.findOne({ role: role }).select('phoneNumber username');

        if (!agent) {
            // 2. If no specific agent exists, fallback to Superadmin or Head Office
            const superAdmin = await Admin.findOne({ role: 'superadmin' }).select('phoneNumber username');
            
            return res.status(200).json({
                phoneNumber: superAdmin ? superAdmin.phoneNumber : "94711175884",
                name: superAdmin ? "Head Office" : "Support Team",
                isFallback: true
            });
        }

        // 3. Return the specific agent found
        res.status(200).json({
            phoneNumber: agent.phoneNumber,
            name: agent.username,
            isFallback: false
        });
    } catch (error) {
        console.error(`Error fetching ${req.params.role}:`, error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {register, login, getAgentContactByRole};