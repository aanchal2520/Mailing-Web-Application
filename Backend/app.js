const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const usersRoute = require('./Routes/users');

app.use('/users', usersRoute);




app.get("/",(req,res)=>{
    return res.status(200).json({"status":"OK"});
}
)

app.listen(PORT, console.log(`Server starting on port ${PORT}`));