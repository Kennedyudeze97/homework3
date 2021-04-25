// load the things we need
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
//app.use(express.static("public"));

// required module to make calls to a REST API
const axios = require('axios');
const { response } = require('express');

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('pages/index', {
        data: ''
    });
});

// form processing
app.post('/process_form', function(req, res){ 
    var selection = parseInt(req.body.selection);
    if ( selection || selection == 0) {        
        // create a GET request to retrieve one pogramming language's details from API
        data = {}
        axios.get('https://cwrvx8v6xj.execute-api.us-east-2.amazonaws.com/default/apitest')
        .then((response)=>{
            response.data.forEach(function (element) {
                // search for the language of selected id
                if (element['id'] == selection) {
                    data = element;
                }
            });
            res.render('pages/results', {
                data: data
            });
        });        
    }    
    else{
        res.render('pages/index', {
            data: "Make selection first"
        });
    }    
})

// run the server from a specific port. 3000 in this case
const port = 3000
app.listen(port, () => {
    console.log(`Front-end app listening at http://localhost:${port}`)
})
