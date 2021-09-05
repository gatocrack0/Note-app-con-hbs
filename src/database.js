const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://admin:A0mdxOqKjVrZ8eF3@note-app.qyhrk.mongodb.net/note-app?retryWrites=true&w=majority";


mongoose.connect(MONGODB_URI,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err)); 

