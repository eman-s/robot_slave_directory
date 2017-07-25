const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const robotIndex = require('./robot_data.js');



// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());


app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
//-^
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World! It is now ' + (new Date()) + ` <a href="http://localhost:3000/robotindex">robot?</a>` );
});

app.get('/robotindex', function (req, res) {
  res.render('robots', {users : robotIndex.users} );
});


app.get('/robot/:id', function(req, res) {
  let robot = robotIndex.users.find(function(slave){
    return slave.username.toLowerCase() === req.params.id;
  });
  res.render('a_robot', robot);
});

app.listen(3000, function (){
  console.log('!!!This app is listening on port 3000!!!');
});
