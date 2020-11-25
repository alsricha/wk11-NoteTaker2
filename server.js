// Dependencies
//=======================================================

var express = require("express");
var path = require("path")

// Sets up Express App
//=======================================================
var app = express();
var PORT = process.env.PORT || 3500;

// Set up the Express app to handle data parsing
//=======================================================

app.use(express.urlencoded({ extended: true}));

app.use(express.json());

//app.use(express.static('public'));
process.env.PWD = process.cwd()
app.use(express.static(path.join(process.env.PWD,'public')));

//Routes
//========================================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Starts the server to begin listening
//=======================================================

app.listen(PORT, function () { 
    console.log("App listening on PORT: " + PORT)
});

