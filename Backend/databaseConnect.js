const mongoose = require('mongoose');

const dbconnect =mongoose.connect('mongodb://localhost:27017/testEmailApp', 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
  });

// const dbconnect = mongoose.connect('mongodb+srv://aanchal25:aanchal@cluster0.yhj7q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// })

module.exports = dbconnect;