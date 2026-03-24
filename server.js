const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const dbURI = process.env.mongo_uri;

// Import Routes
const ticketRoutes = require('./Routes/TicketRoutes');
const visaRoutes = require('./Routes/VisaRoutes');
const HotelRoutes = require('./Routes/HotelRoutes');
const ContactRoutes = require('./Routes/ContactRoutes');
const AdminRoutes = require('./Routes/AdminRoutes');
const PackageRoutes = require('./Routes/PackageRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/visas', visaRoutes);
app.use('/api/hotels', HotelRoutes);
app.use('/api/contacts', ContactRoutes);
app.use('/api/admins', AdminRoutes);
app.use('/api/packages', PackageRoutes);

// MongoDB connection
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

//For local dev only
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.port || 3000;
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}


module.exports = app;