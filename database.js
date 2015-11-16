
var r = require('rethinkdb');
var uuid = require('node-uuid');

var c = r.connect({host: 'localhost', port: 28015}, function (err, conn) {
  if (err) throw err;
  c = conn;
});

function getUser(username, fn) {

  r.db('something').table('users').filter({username: username})
  .run(c, function (err, result) {
    result.toArray(function (err, arr) {
      if (!arr.length) return fn(false);
      fn(true, arr[0]);
    });
  });

}

module.exports.addUser = function addUser(username, fn) {

  function insertUser() {

    var user = {
      username: username,
      balance: 0,
      deposits: [],
      withdrawels: [],
      created: Math.floor(Date.now() / 1000)
    }

    r.db('something').table('users').insert(user).run(c, function (err) {

      if (err) return fn(err);

      fn(null);

    });

  }

  getUser(username, function (exists) {
    if (exists) return fn(new Error('user already exists'));
    insertUser();
  });

}

module.exports.deleteUser = function deleteUser(username, fn) {

  function deleteUser() {

    r.db('something').table('users').filter({username: username})
    .delete().run(c, function (err) {
      if (err) return fn(err);
      fn(null);
    });

  }

  getUser(username, function (exists) {
    if (!exists) return fn(new Error('user does not exist'));
    deleteUser();
  });

}

module.exports.addDeposit = function addDeposit(username, amount, fn) {

  function addDeposit(fn) {

    var deposit = {
      amount: amount,
      id: uuid.v1(),
      created: Math.floor(Date.now() / 1000)
    }

    r.db('something').table('users').filter(r.row('username').eq(username))
    .update({deposits: r.row('deposits').append(deposit)}).run(c, function (err, result) {
      fn(err);
    });

  }

  function setBalance(fn) {

    r.db('something').table('users').filter({username: username})
    .update({balance: r.row('balance').add(parseFloat(amount))})
    .run(c, function (err, results) {
      fn(err)
    });

  }

  getUser(username, function (exists, user) {
    if (!exists) return fn(new Error('user does not exist'));
    addDeposit(function (err) {
      if (err) return fn(err);
      setBalance(function (err) {
        fn(err, parseFloat(user.balance) + parseFloat(amount));
      });
    });
  });

}

module.exports.addWithdrawel = function addWithdrawel(username, amount, fn) {

  function addWithdrawel(fn) {

    var withdrawel = {
      amount: amount,
      id: uuid.v1(),
      created: Math.floor(Date.now() / 1000)
    }

    r.db('something').table('users').filter(r.row('username').eq(username))
    .update({withdrawels: r.row('withdrawels').append(withdrawel)}).run(c, function (err, result) {
      fn(err);
    });

  }

  function setBalance(fn) {
    r.db('something').table('users').filter({username: username})
    .update({balance: r.row('balance').sub(parseFloat(amount))})
    .run(c, function (err, results) {
      fn(err);
    });
  }

  getUser(username, function (exists, user) {
    if (!exists) return fn(new Error('user does not exist'));
    addWithdrawel(function (err) {
      if (err) return fn(err);
      setBalance(function (err) {
        fn(err, parseFloat(user.balance) - parseFloat(amount));
      });
    });
  });

}

module.exports.getDeposits = function getDeposits(username, fn) {

  getUser(username, function (exists, user) {
    if (!exists) return fn(new Error('user does not exist'));
    fn(null, user.deposits);
  });

}

module.exports.getWithdrawels = function getWithdrawels(username, fn) {

  getUser(username, function (exists, user) {
    if (!exists) return fn(new Error('user does not exist'));
    fn(null, user.withdrawels);
  });

}
