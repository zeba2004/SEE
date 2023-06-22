const prompt = require('prompt-sync')();
const { MongoClient, ObjectId } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://zeba:zebafathima@cluster0.xvkuu7o.mongodb.net/see?retryWrites=true&w=majority';

// Database and collection names
const databaseName = 'see';
const collectionName = 'rasgullas';

// Create a MongoDB client
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    // Create operation

    const createRasgulla = async function() {
      const radius = parseFloat(prompt('Enter rasgulla radius: '));
      const height = parseFloat(prompt('Enter rasgulla height: '));
    
      const area = calculateArea(radius,height);
      const rasgulla = {
        radius: radius,
        height: height,
        area: area
      };
    
      const result = await collection.insertOne(rasgulla);
      console.log('Rasgulla created successfully:', result.insertedId);
    };
    

    // Read operation
    const readRasgullas = async function ()  {
      const rasgullas = await collection.find({}).toArray();

      console.log('Rasgullas:');
      rasgullas.forEach((rasgulla) => {
        console.log(`ID: ${rasgulla._id}, Radius: ${rasgulla.radius}, Height: ${rasgulla.height}, Area: ${rasgulla.area}`);
      });
    };

    // Update operation
    const updateRasgulla = async function() {
      const id = prompt('Enter the ID of the rasgulla to update: ');
      const radius = parseFloat(prompt('Enter updated rasgulla radius: '));
      const height = parseFloat(prompt('Enter updated rasgulla height: '));

      const area = calculateArea(radius);
      const updatedRasgulla = {
        radius: radius,
        height: height,
        area: area
      };

      const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedRasgulla });
      if (result.modifiedCount > 0) {
        console.log('Rasgulla updated successfully.');
      } else {
        console.log('No rasgulla found with the specified ID.');
      }
    };

    // Delete operation
    const deleteRasgulla = async function()  {
      const id = prompt('Enter the ID of the rasgulla to delete: ');

      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount > 0) {
        console.log('Rasgulla deleted successfully.');
      } else {
        console.log('No rasgulla found with the specified ID.');
      }
    };

    // Prompt for CRUD operation
    const performCRUD = async function ()  {
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
        await client.close();
        console.log('Disconnected from MongoDB');
      }
    };

    // Start the CRUD operations
    await performCRUD();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Helper function to calculate the area of a rasgulla
function calculateArea(radius,height) {
  return Math.PI * radius * height;
}

// Invoke the function to connect and perform CRUD operations
connectToMongoDB();
