const express = require("express")
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser')
db=require('./db');


app.use(bodyParser.urlencoded({
    extended: false
}))
var router = express.Router();
app.use(cors());
router.post('/test', (req, res) => {
    var user=req.body;
    console.log(Object.keys(user));
    res.send('ok');
});

module.exports = router;