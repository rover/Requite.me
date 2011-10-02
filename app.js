
/**
 * Module dependencies.
 */

var express = require('express');
 	app = module.exports = express.createServer();
	fs = require('fs');
	
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});
//for development only
app.get('/test', function(req, res){
  res.render('test', {
    title: 'Layout Test'
  });
});

app.get('/layout', function(req, res){
	res.render('testren', {
		layout: 'layout',
		locals: { title: 'this is a render test'}
	});
});

app.get('/daniel', function(req, res){
	//send regulkar html from 
	fs.readFile(__dirname + '/public/daniel.html', 'utf8', function(err, text){
	        res.send(text);
	    });
});
//--end development section
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
