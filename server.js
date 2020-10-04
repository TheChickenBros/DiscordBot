const express = require('express');
const bodyParser = require('body-parser');
const main = require('./index.js');
const app = express();

app.set("view engine", "ejs"); 

app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.render("index");
});

app.post('/', (req, res) => {
    console.log(`Message to send: ${req.body.msg} Channel: ${req.body.chnl}`);
    main.sendServerMessage(req.body.msg, req.body.chnl);
    res.send('Sent Message (hopefully)');
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});