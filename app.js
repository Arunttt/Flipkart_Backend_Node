var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

var database = require('./database.js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var PurchaseRouter = require('./routes/purchaseRoutes');
const LoginRouter = require('./routes/LoginRoutes.js');
const addCartRouter = require('./routes/AddtoCartRoutes.js');
const orderRouter = require('./routes/OrderRoutes.js');

const cors = require('cors');

var app = express();

var port = 3050;
app.use(cors({
  origin : "http://localhost:5173",
  methods : ["GET", "POST", "PUT", "DELETE"],
  credentials : true
}));

app.use(express.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/purchase', PurchaseRouter);
app.use('/usersLogin',LoginRouter);
app.use('/cart',addCartRouter);
app.use('/order',orderRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on port http://0.0.0.0:${port}`);
});



module.exports = app;
