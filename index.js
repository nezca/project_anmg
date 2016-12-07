//------------ npm express setting --------------
var express = require('express');
var app = express();
app.use(express.static('public'));

//------------ local server port setting ---------
app.set('port', (process.env.PORT || 5000));

//----------- pug(former 'jade') setting -----------
app.set('view engine','pug');
app.set('views', './views');

//---------- ■ MySQL setting -----------
//var mysql      = require('mysql');
//var connection = mysql.createConnection({
//  host     : 'us-cdbr-iron-east-04.cleardb.net', 
//  user     : 'b69910662a1301',
//  password : '0c76890f',
//  database : 'heroku_36ce9bdde949664'
//});
//
//connection.connect();

//- MySQL Against Disconnect setting instead ■ MySQL setting----
var db_config = {
  host     : 'us-cdbr-iron-east-04.cleardb.net', 
  user     : 'b69910662a1301',
  password : '0c76890f',
  database : 'heroku_36ce9bdde949664'
};

//var connection;
//function handleDisconnect(){
//  connection = mysql.createConnection(db_config); 
//  connection.connect(function(err) {              
//    if(err) {
//      console.log('error when connecting to db:', err);
//      setTimeout(handleDisconnect, 2000);
//    }
//  });                                     
//                                         
//  connection.on('error', function(err) {
//    console.log('db error', err);
//    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
//      handleDisconnect();                         
//    } else {                                      
//      throw err;                                  
//    }
//  });
//};

//handleDisconnect();

//----------------------another way to sql connect ----

var handleKFDisconnect = function() {
    kfdb.on('error', function(err) {
        if (!err.fatal) {
            return;
        }
        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            console.log("PROTOCOL_CONNECTION_LOST");
            throw err;
        }
        log.error("The database is error:" + err.stack);

        kfdb = mysql.createConnection(kf_config);

        console.log("kfid");

        console.log(kfdb);
        handleKFDisconnect();
    });
   };
//   handleKFDisconnect();

//------------ Pages Routing -----------------------------
app.get('/', function(req,res){
    res.render('intro');
});

app.get('/home', function(req,res){
    res.render('intro');
});


//------------ pages routinh for MySQL Test --------------
//app.get('/home', function(req,res){
//  var sql = 'SELECT id,title FROM topic';
//  connection.query(sql, function(err, topics, fields){
//    if(err){
//            console.log(err);
//            res.status(500).send('what the fuck you!');
//        }
//    res.render('add',{topics:topics});
//  });  
//});

//----- node.js tutorial's app.listen method -----
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});