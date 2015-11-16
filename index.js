
var db = require('./database');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var endpoints = {
  'GET /': 'http://localhost:8000/api',
  'GET /deposits/username': 'http://localhost:8000/api/deposits?username=[username]',
  'GET /withdrawels/username': 'http://localhost:8000/api/withdrawels?username=[username]',
  'POST /add/username': 'curl --data "username=[username]" http://localhost:8000/api/add',
  'POST /delete/username': 'curl --data "username=[username]" http://localhost:8000/api/delete',
  'POST /deposit/username/amount': 'curl --data "username=[username]&amount=[amount]" http://localhost:8000/api/deposit',
  'POST /withdrawl/username/amount': 'curl --data "username=[username]&amount=[amount]" http://localhost:8000/api/withdrawel'
}

function getError(message) {
  if (message == 'user already exists') return 422;
  if (message == 'user does not exist') return 422;
  if (message == 'incorrect format') return 400;
  return 404;
}

function isAmountCorrectFormat(amount) {

  function isNumeric(str) {
    if (!isNaN(parseFloat(amount)) && isFinite(amount)) return false;
    return true;
  }

  function isTwoDecimalPlaces(str) {
    if (str.indexOf('.') != -1) {
      str = str.split('.');
      if (str.length != 2) return false;
      if (str[1].split('').length != 2) return false;
    }
    return true;
  }

  if (isNumeric(amount)) return false;
  if (!isTwoDecimalPlaces(amount)) return false;

  return true;
}

app.get('/api', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(endpoints));
});

app.post('/api/add', function (req, res) {

  var query = req.body;

  if (!query.username) {
    res.writeHead(getError('incorrect format'));
    res.end('incorrect format');
    return false;
  }

  db.addUser(query.username, function (err) {
    if (err) {
      res.writeHead(getError(err.message));
      res.end(err.message);
      return false;
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('did add user');
  });

});

app.post('/api/delete', function (req, res) {

  var query = req.body;

  if (!query.username) {
    res.writeHead(getError('incorrect format'));
    res.end('incorrect format');
    return false;
  }

  db.deleteUser(query.username, function (err) {
    if (err) {
      res.writeHead(getError(err.message));
      res.end(err.message);
      return false;
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('did delete user');
  });

});

app.post('/api/deposit', function (req, res) {

  var query = req.body;

  if (!query.username || !query.amount || !isAmountCorrectFormat(query.amount)) {
    res.writeHead(getError('incorrect format'));
    res.end('incorrect format');
    return false;
  }

  db.addDeposit(query.username, query.amount, function (err, balance) {
    if (err) {
      res.writeHead(getError(err.message));
      res.end(err.message);
      return false;
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({balance: balance}));
  });

});

app.post('/api/withdrawel', function (req, res) {

  var query = req.body;

  if (!query.username || !query.amount || !isAmountCorrectFormat(query.amount)) {
    res.writeHead(getError('incorrect format'));
    res.end('incorrect format');
    return false;
  }

  db.addWithdrawel(query.username, query.amount, function (err, balance) {
    if (err) {
      res.writeHead(getError(err.message));
      res.end(err.message);
      return false;
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({balance: balance}));
  });

});

app.get('/api/deposits', function (req, res) {

  var query = url.parse(req.url, true).query;

  if (!query.username) {
    res.writeHead(getError('incorrect format'));
    res.end('incorrect format');
    return false;
  }

  db.getDeposits(query.username, function (err, result) {
    if (err) {
      res.writeHead(getError(err.message));
      res.end(err.message);
      return false;
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(result));
  });

});

app.get('/api/withdrawels', function (req, res) {

  var query = url.parse(req.url, true).query;

  if (!query.username) {
    res.writeHead(getError('incorrect format'));
    res.end('incorrect format');
    return false;
  }

  db.getWithdrawels(query.username, function (err, result) {
    if (err) {
      res.writeHead(getError(err.message));
      res.end(err.message);
      return false;
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(result));
  });

});

var server = app.listen(8000, function () {

});
