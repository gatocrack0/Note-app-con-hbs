const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://gatocrack0:gatoblack2005@note-app.qyhrk.mongodb.net/note-app?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err)); 

