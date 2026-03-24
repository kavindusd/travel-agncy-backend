const Package = require('../Models/Package');

// 1. GET ALL PACKAGES
const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch packages", error: error.message });
    }
};

// 2. ADD NEW PACKAGE
const createPackage = async (req, res) => {
    try {
        const packageData = { ...req.body };

        // Handle the Image Upload
        if (req.file) {
            packageData.image = `/${req.file.filename}`;
        }

        // Handle Highlights Array (arrives as JSON string via FormData)
        if (packageData.highlights) {
            try {
                packageData.highlights = typeof packageData.highlights === 'string'
                    ? JSON.parse(packageData.highlights)
                    : packageData.highlights;
            } catch (e) {
                packageData.highlights = [];
            }
        }

        const newPackage = new Package(packageData);
        await newPackage.save();

        res.status(201).json({
            message: "Package published successfully!",
            data: newPackage
        });
    } catch (error) {
        res.status(400).json({ message: "Validation or Upload Error", error: error.message });
    }
};

// 3. UPDATE PACKAGE
const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body }; // ✅ FIX: was using undefined 'packageData' below

        // If a NEW image is uploaded, update the path
        if (req.file) {
            updateData.image = `/${req.file.filename}`;
        }

        // ✅ FIX: was referencing 'packageData' (undefined) — now correctly uses 'updateData'
        if (updateData.highlights) {
            try {
                updateData.highlights = typeof updateData.highlights === 'string'
                    ? JSON.parse(updateData.highlights)
                    : updateData.highlights;
            } catch (e) {
                updateData.highlights = [];
            }
        }

        const updatedPackage = await Package.findOneAndUpdate(
            { id: id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedPackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.status(200).json({
            message: "Package updated successfully",
            data: updatedPackage
        });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

// 4. DELETE PACKAGE
const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Package.findOneAndDelete({ id: id });

        if (!deleted) {
            return res.status(404).json({ message: "Package does not exist" });
        }

        res.status(200).json({ message: "Package removed from system" });
    } catch (error) {
        res.status(500).json({ message: "Delete operation failed", error: error.message });
    }
};

module.exports = {
    getAllPackages,
    createPackage,
    updatePackage,
    deletePackage
};