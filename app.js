const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

//Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//passport config
require('./config/passport')(passport);


//DB Config
const db = require('./config/database');

//Map Gloabal Promise -get rid of warning
mongoose.Promise = global.Promise;

//Connect To Mongoose
mongoose.connect(db.mongoURI,{
    useNewUrlParser: true
})
.then(() => { console.log('mongodb Connected');})
.catch(err => console.log(err));



//How Middlewae Works
// app.use(function(req , res, next){
//     //console.log(Date.now());
//     req.name = 'Mahmudul hassan';
//     next();
// })

//HandleBars MiddleWare
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Method Override
app.use(methodOverride('_method'))

//Session Express
app.use(session({
  secret: 'screet',
  resave: false,
  saveUninitialized: true,
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session())


//Connect
app.use(flash());


//Global Variable
app.use(function(req , res , next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


//Index Route
app.get('/',(req , res) => {
   //res.send('Index');
   const title = 'Welcome';
   res.render('index',{
   	title : title
   });
});

app.get('/about',(req , res) => {
   //res.send('About');
   res.render('about');
});



//Ideas routes
app.use('/ideas',ideas);

//Users routes
app.use('/users',users);



const port = process.env.PORT || 5000;
app.listen(port,() => {
	console.log(`Sever Started on port ${port}`);
});







