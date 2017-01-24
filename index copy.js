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
  //------------ 첫(조회) 페이지 -------------------------
app.get('/', function(req,res){
  res.render('intro');
});
  //------------ 결과 페이지 ---------------

app.post('/return', function(req,res){
  var map_name = req.body.map_name;
  var route_type = req.body.route_type; 
  var origin_address = req.body.origin_address;
  var destination_address = req.body.destination_address;
  var distance = req.body.distance;
  var duration_type : req.body.duration_type;
  var altitude_start : req.body.altitude_start;
  var altitude_end : req.body.altitude_end;
  var altitude_top : req.body.altitude_top;
  var altitude_vertical_gap : req.body.altitude_vertical_gap;
  var difficulty_type = req.body.difficulty_type;
  var budget = req.body.budget;
  var recommend_type = req.body.recommend_type;
  var enroll_admin = req.body.enroll_admin;
  var enroll_date = req.body.enroll_date;
  var map_url = req.body.map_url;
  var course_type = req.body.course_type;
  var sql = 'SELECT * FROM exporttable WHERE distance < ? and duration_type = ? and difficulty_type = ? order by altitude_top desc limit 3';
  connection.query(sql,[distance,duration_type,difficulty_type], function(err, project_anmg, fields){
    if(err){
      console.log(err);
      res.status(500).send('what the hell!');
      }
    res.render('return',{project_anmg:project_anmg});   
  });
});  

//----- node.js tutorial's app.listen method -----
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});