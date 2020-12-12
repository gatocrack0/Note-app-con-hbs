const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://gatocrack0:gatoblack2005@freecluster.qyhrk.mongodb.net/FreeCluster?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err)); 

/* const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://gatocrack0:gatoblack2005@freecluster.qyhrk.mongodb.net/FreeCluster?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 */