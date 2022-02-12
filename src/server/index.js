
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const { builtinModules } = require('module')
const dotenv = require('dotenv');
dotenv.config();
const baseUrl = process.env.API_ID;
const apiKey = process.env.API_KEY;


const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors')
// Cors for cross origin allowance
app.use(cors())
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const get = {};

app.post('/api', async function(req,res){
   const inputUrl = req.body.input;
    const url = "&url="+inputUrl+"&lang=en";
    const fetchedUrl = `${baseUrl}${apiKey}${url}`;
    // const response = await fetch(fetchedUrl);
    // const data = await response.json();
    console.log(fetchedUrl)
    get.url = fetchedUrl;
    res.send(get);
})