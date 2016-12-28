//------------ npm express setting --------------
var express = require('express');
var app = express();
app.use(express.static('public'));

//------------ local server port setting ---------
app.set('port', (process.env.PORT || 5000));

//----------- pug(former 'jade') setting -----------
app.set('view engine','pug');
app.set('views', './views');

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

app.get('/portfolio', function(req,res){
    res.render('portfolio');
});

//------------ pages routinh for MySQL Test ----------
app.get('/DBTest', function(req,res){
  var sql = 'SELECT id,title FROM topic';
  connection.query(sql, function(err, topics, fields){
    if(err){
            console.log(err);
            res.status(500).send('what the fuck you!');
        }
    res.render('DBTest',{topics:topics});
  });  
});

//----- node.js tutorial's app.listen method -----
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});