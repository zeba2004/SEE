const prompt = require('prompt-sync')();
const mongoose = require('mongoose');

// Connection URI
const uri = 'mongodb+srv://zeba:zebafathima@cluster0.xvkuu7o.mongodb.net/see?retryWrites=true&w=majority';

// Define a schema for the rasgullas collection
const rasgullaSchema = new mongoose.Schema({
  radius: { type: Number, required: true },
  height: { type: Number, required: true },
  area: { type: Number, required: true }
});

// Create a model based on the schema
const Rasgulla = mongoose.model('Rasgulla', rasgullaSchema, 'rasgullas');

async function connectToMongoDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Prompt for CRUD operation
    const performCRUD = async () => {
      const operation = prompt(
        'Select CRUD operation: (C)reate, (R)ead, (U)pdate, (D)elete, (E)xit: '
      ).toUpperCase();

      switch (operation) {
        case 'C':
          await createRasgulla();
          break;
        case 'R':
          await readRasgullas();
          break;
        case 'U':
          await updateRasgulla();
          break;
        case 'D':
          await deleteRasgulla();
          break;
        case 'E':
          console.log('Exiting...');
          break;
        default:
          console.log('Invalid operation. Please try again.');
          break;
      }

      // Perform another CRUD operation
      if (operation !== 'E') {
        await performCRUD();
      } else {
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
      }
    };

    // Create operation
    const createRasgulla = async () => {
      const radius = parseFloat(prompt('Enter rasgulla radius: '));
      const height = parseFloat(prompt('Enter rasgulla height: '));

      const area = calculateArea(radius, height);
      const rasgulla = new Rasgulla({
        radius: radius,
        height: height,
        area: area
      });

      await rasgulla.save();
      console.log('Rasgulla created successfully:', rasgulla._id);
    };

    // Read operation
    const readRasgullas = async () => {
      const rasgullas = await Rasgulla.find();

      console.log('Rasgullas:');
      rasgullas.forEach((rasgulla) => {
        console.log(`ID: ${rasgulla._id}, Radius: ${rasgulla.radius}, Height: ${rasgulla.height}, Area: ${rasgulla.area}`);
      });
    };

    // Update operation
    const updateRasgulla = async () => {
      const id = prompt('Enter the ID of the rasgulla to update: ');
      const radius = parseFloat(prompt('Enter updated rasgulla radius: '));
      const height = parseFloat(prompt('Enter updated rasgulla height: '));

      const area = calculateArea(radius, height);
      const updatedRasgulla = {
        radius: radius,
        height: height,
        area: area
      };

      const result = await Rasgulla.updateOne({ _id: id }, updatedRasgulla);
      if (result.nModified > 0) {
        console.log('Rasgulla updated successfully.');
      } else {
        console.log('No rasgulla found with the specified ID.');
      }
    };

    // Delete operation
    const deleteRasgulla = async () => {
      const id = prompt('Enter the ID of the rasgulla to delete: ');

      const result = await Rasgulla.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        console.log('Rasgulla deleted successfully.');
      } else {
        console.log('No rasgulla found with the specified ID.');
      }
    };

    // Helper function to calculate the area of a rasgulla
    function calculateArea(radius, height) {
      return Math.PI * radius * height;
    }

    // Start the CRUD operations
    await performCRUD();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Invoke the function to connect and perform CRUD operations
connectToMongoDB();
