// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express application
const app = express();
const PORT = 3000;

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (ensure MongoDB is running and a database named 'node-angular-crud' exists)
mongoose.connect('mongodb://localhost:27017/node-angular-crud', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a MongoDB schema for items
const Schema = mongoose.Schema;
const itemSchema = new Schema({
  name: String,
  description: String,
});

// Create a MongoDB model based on the schema
const Item = mongoose.model('Item', itemSchema);

// Define routes for CRUD operations

// GET all items
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST create a new item
app.post('/api/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

// PUT update an existing item
app.put('/api/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

// DELETE delete an item by ID
app.delete('/api/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
