var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));


//----------- pug(former jade) setting -----------
app.set('view engine','pug');
app.set('views', './views');

app.get('/', function(req,res){
    res.render('intro');
});


//----- node.js tutorial's app.listen method -----
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});