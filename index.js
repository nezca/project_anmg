//------------ npm express setting --------------
var express = require('express');
var app = express();
var multer = require('multer');
app.use(express.static('public'));
var bootstrap = require("express-bootstrap-service");
var bodyPaser = require('body-parser');

//------------ local server port setting ---------
app.set('port', (process.env.PORT || 5000));

//----------- pug(former 'jade') setting -----------
app.set('view engine','pug');
app.set('views', './views');
app.use(bootstrap.serve);
app.use(bodyPaser.urlencoded({extended:false}));

//--------- ClearDB(mysql) Setting -------------------
var mysql      = require('mysql');
var db_config = {
  host     : 'us-cdbr-iron-east-04.cleardb.net', 
  user     : 'b69910662a1301',
  password : '0c76890f',
  database : 'heroku_36ce9bdde949664'
};
var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);
  connection.connect(function(err) {              
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }                                     
  });                                     
                                          
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();                         
    } else {
      throw err;                                  
    }
  });
}


handleDisconnect();

//------------ Pages Routing -------------------------
    
app.get('/', function(req,res){
  res.render('intro');
});

app.post('/return', function(req,res){
  var id = req.body.course_id;
  var name = req.body.course_name;
  var index = req.body.course_index;
  var distance = req.body.course_distance;
  var difficulty = req.body.course_difficulty;
  var duration = req.body.course_duration;
  var budget = req.body.course_budget;
  var youtube_nor = req.body.youtube_nor;
  var youtube_emb = req.body.youtube_emb;
  var map_nor = req.body.map_nor;
  var map_emb = req.body.map_emb;
  var iconmap_nor = req.body.map_nor;
  var iconmap_emb = req.body.map_emb;
  var fusion_nor = req.body.fusion_nor;
  var fusion_emb = req.body.fusion_emb;
  var text = req.body.text;
  var sql = 'SELECT * FROM exporttable HAVING course_distance < ? and course_difficulty < ? and course_budget < ? and course_duration < ?';
  connection.query(sql,[distance,difficulty,budget,duration], function(err, trekking, fields){
//  var sql = 'SELECT * FROM course_test HAVING course_distance < ? or course_difficulty < ? or course_budget < ? or course_duration < ? or course_submit < ?';
//  connection.query(sql,[distance,difficulty], function(err, trekking, fields){
    if(err){
      console.log(err);
      res.status(500).send('what the hell!');
      }
    res.render('return',{trekking:trekking});   
  });
});

//----- node.js tutorial's app.listen method -----
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});