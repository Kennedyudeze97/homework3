// load the things we need
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
//app.use(express.static("public"));

// required module to make calls to a REST API
const axios = require('axios');

// test data
var data = [{"id": 0, "name": "Python", "createdAt": "1991-02-20", "createdBy": "Guido van Rossum", "marketSharePercent": 16.6, "typingDisciplines": ["duck", "dynamic", "strong"]}, 
{"id": 1, "name": "C", "createdAt": "1972-01-01", "createdBy": "Dennis Ritchie", "marketSharePercent": 3.2, "typingDisciplines": ["static", "weak", "manifest", "nominal"]}, 
{"id": 2, "name": "Java", "createdAt": "1995-05-23", "createdBy": "James Gosling", "marketSharePercent": 11.6, "typingDisciplines": ["static", "strong", "manifest", "safe", "nominative"]}, 
{"id": 3, "name": "C#", "createdAt": "2000-01-01", "createdBy": "Microsoft", "marketSharePercent": 3.6, "typingDisciplines": ["static", "dynamic", "strong", "safe", "nominative"]}, 
{"id": 4, "name": "JavaScript", "createdAt": "1995-12-04", "createdBy": "Brendan Eich", "marketSharePercent": 18.7, "typingDisciplines": ["duck", "dynamic"]}]

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
    if (selection) {
        res.render('pages/results', {
            data: data[selection]
        });
    }
    
    else{
        res.render('pages/index', {
            data: "Make selection first"
        });
    }
    console.log(selection)
    
})

const port = 3000
app.listen(port, () => {
    console.log(`Front-end app listening at http://localhost:${port}`)
})
