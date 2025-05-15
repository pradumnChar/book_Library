// === server/server.js ===
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


const connectDB = require('./db/config');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
















//2task mail to harsh sir

///Book Library (React + Node + MongoDB) - Add, list, search books w

// public static node(Node head)
// {
// node curr=head;
// node prev=null;
// node next=null;
//  while(curr!=null){
//      next=curr.next;
//      curr.next=prev;
//      prev=curr;
//      curr=next;

//  }
// return