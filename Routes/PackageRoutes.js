const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getAllPackages,
    createPackage,
    updatePackage,
    deletePackage
} = require('../Controllers/PackageController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../travel-agency-site/public/'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
router.get('/all', getAllPackages);
router.post('/add', upload.single('imageFile'), createPackage);
router.patch('/update/:id', upload.single('imageFile'), updatePackage);
router.delete('/delete/:id', deletePackage);

module.exports = router;