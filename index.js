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
  var duration_rate = req.body.duration_rate;
  var difficulty_index = req.body.difficulty_index; 
  var budget = req.body.budget;
  var sql = 'SELECT * FROM exporttable WHERE duration_rate <= ? and difficulty_index <= ? and budget <= ? order by recommend_average desc limit 3';
  connection.query(sql,[duration_rate, difficulty_index, budget], function(err, project_anmg, fields){
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