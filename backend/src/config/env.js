PORT=5000
MONGO_URI=
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<jvbaracho2004>:<hxzza;gdkD7#=Ra>@pizzariaclustern3.fus6jak.mongodb.net/?retryWrites=true&w=majority&appName=PIZZARIACLUSTERN3";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

JWT_SECRET=sua_chave_secreta_supersegura
