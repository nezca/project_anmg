//------------ npm express setting --------------
var express = require('express');
var app = express();
app.use(express.static('public'));

//------------ local server port setting ---------
app.set('port', (process.env.PORT || 5000));

//----------- pug(former 'jade') setting -----------
app.set('view engine','pug');
app.set('views', './views');

//------------ Pages Routing -----------------------------
app.get('/', function(req,res){
    res.render('intro');
});

//----- node.js tutorial's app.listen method -----
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});