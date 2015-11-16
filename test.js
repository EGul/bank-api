
var request = require('request');
var assert = require('assert');

describe('Bank API', function () {

  describe('API format', function () {

    before(function (done) {

      request.post('http://localhost:8000/api/add', {form: {username: 'temp'}}, function (err, res, body) {
        done();
      });

    });

    after(function (done) {

      request.post('http://localhost:8000/api/delete', {form: {username: 'temp'}}, function (err, res, body) {
        done();
      });

    });

    it('Should get 400 for incorrect format', function (done) {

      request.post('http://localhost:8000/api/add', {form: {user: 'temp'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(400, res.statusCode);
        assert.equal('incorrect format', body);
        done();
      });

    });

    it('Should get 400 for incorrect format', function (done) {

      request.post('http://localhost:8000/api/delete', {form: {user: 'temp'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(400, res.statusCode);
        assert.equal('incorrect format', body);
        done();
      });

    });

    it('Should get 400 for incorrect format', function (done) {
      request.post('http://localhost:8000/api/deposit', {form: {users: 'temp'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(400, res.statusCode);
        assert.equal('incorrect format', body);
        done();
      });
    });

    it('Should get 400 for incorrect format', function (done) {
      request.post('http://localhost:8000/api/withdrawel', {form: {users: 'temp'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(400, res.statusCode);
        assert.equal('incorrect format', body);
        done();
      });
    });

    it('should get 400 for incorrect format', function (done) {
      request('http://localhost:8000/api/deposits?user=temp', function (err, res, body) {
        assert.equal(null, err);
        assert.equal(400, res.statusCode);
        assert.equal('incorrect format', body);
        done();
      });
    });

    it('should get 400 for incorrect format', function (done) {
      request('http://localhost:8000/api/withdrawels?user=temp', function (err, res, body) {
        assert.equal(null, err);
        assert.equal(400, res.statusCode);
        assert.equal('incorrect format', body);
        done();
      });
    });

    it('should get 400 for incorrect format for deposit amount', function (done) {
      request.post('http://localhost:8000/api/deposit', {form: {username: 'temp', amount: 'q'}}, function(err, res, body) {
        assert.equal(null, err);
        assert.equal(400, res.statusCode);
        assert.equal('incorrect format', body);
        done();
      } );
    });

    it('should get 400 for incorrect format for deposit amount', function (done) {
      request.post('http://localhost:8000/api/deposit', {form: {username: 'temp', amount: '10.0'}}, function(err, res, body) {
        assert.equal(null, err);
        assert.equal(400, res.statusCode);
        assert.equal('incorrect format', body);
        done();
      } );
    });

    it('should get 400 for incorrect format for deposit amount', function (done) {
      request.post('http://localhost:8000/api/deposit', {form: {username: 'temp', amount: '10.000'}}, function(err, res, body) {
        assert.equal(null, err);
        assert.equal(400, res.statusCode);
        assert.equal('incorrect format', body);
        done();
      } );
    });

    it('should get 400 for incorrect format for deposit amount', function (done) {
      request.post('http://localhost:8000/api/deposit', {form: {username: 'temp', amount: '10.00.00'}}, function(err, res, body) {
        assert.equal(null, err);
        assert.equal(400, res.statusCode);
        assert.equal('incorrect format', body);
        done();
      } );
    });

    it('Should get 422 for user already exists', function (done) {

      request.post('http://localhost:8000/api/add', {form: {username: 'temp'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(422, res.statusCode);
        assert.equal('user already exists', body);
        done();
      });

    });

    it('should get 422 for user does not exist', function (done) {

      request.post('http://localhost:8000/api/delete', {form: {username: 'notexist'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(422, res.statusCode);
        assert.equal('user does not exist', body);
        done();
      });

    });

    it('should get 422 for user does not exist', function (done) {

      request.post('http://localhost:8000/api/deposit', {form: {username: 'notexist', amount: '0.00'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(422, res.statusCode);
        assert.equal('user does not exist', body);
        done();
      });

    });

    it('should get 422 for user does not exist', function (done) {

      request.post('http://localhost:8000/api/withdrawel', {form: {username: 'notexist', amount: '0.00'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(422, res.statusCode);
        assert.equal('user does not exist', body);
        done();
      });

    });

    it('should get 422 for user does not exist', function (done) {
      request('http://localhost:8000/api/deposits?username=notexist', function (err, res, body) {
        assert.equal(null, err);
        assert.equal(422, res.statusCode);
        assert.equal('user does not exist', body);
        done();
      });
    });

    it('should get 422 for user does not exist', function (done) {
      request('http://localhost:8000/api/withdrawels?username=notexist', function (err, res, body) {
        assert.equal(null, err);
        assert.equal(422, res.statusCode);
        assert.equal('user does not exist', body);
        done();
      });
    });

  });

  describe('Get API', function () {

    it('Should get api', function (done) {

      var opts = {
        host: 'localhost',
        port: '8000',
        path: '/api'
      }

      request('http://localhost:8000/api', function (err, res, body) {
        assert.equal(null, err);
        assert.equal(200, res.statusCode);
        assert.notEqual(null, res);
        done();
      });

    });

  });

  describe('User', function () {

    it('Should add user', function (done) {

      request.post('http://localhost:8000/api/add', {form: {username: 'temp'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(200, res.statusCode);
        assert.equal('did add user', body);
        done();
      });

    });

    it('Should not add user', function (done) {

      request.post('http://localhost:8000/api/add', {form: {username: 'temp'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(422, res.statusCode);
        assert.equal('user already exists', body);
        done()
      });

    });

    it('Should delete user', function (done) {

      request.post('http://localhost:8000/api/delete', {form: {username: 'temp'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(200, res.statusCode);
        assert.equal('did delete user', body);
        done();
      });

    });

    it('Should give error invalid format', function (done) {

      request.post('http://localhost:8000/api/add', {form: {user: 'temp'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(400, res.statusCode);
        assert.equal('incorrect format', body);
        done();
      });

    });

  });

  describe('Deposit', function () {

    before(function (done) {

      request.post('http://localhost:8000/api/add', {form: {username: 'temp'}}, function (err, res, body) {
        done();
      });

    });

    after(function (done) {

      request.post('http://localhost:8000/api/delete', {form: {username: 'temp'}}, function (err, res, body) {
        done();
      });

    });

    it('Should add deposit', function (done) {

      request.post('http://localhost:8000/api/deposit', {form: {username: 'temp', amount: '10.00'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(200, res.statusCode);
        assert.equal('application/json', res.headers['content-type']);
        assert.equal(10.00, JSON.parse(body).balance);
        done();
      });

    });

    it('Should get deposits', function (done) {

      request('http://localhost:8000/api/deposits?username=temp', function (err, res, body) {
        assert.equal(null, err);
        assert.equal(200, res.statusCode);
        assert.equal('application/json', res.headers['content-type']);
        assert.equal(1, JSON.parse(body).length);
        assert.equal(10.00, JSON.parse(body)[0].amount);
        done();
      });

    });

  });

  describe('Withdrawel', function () {

    before(function (done) {

      request.post('http://localhost:8000/api/add', {form: {username: 'temp'}}, function (err, res, body) {
        done();
      });

    });

    after(function (done) {

      request.post('http://localhost:8000/api/delete', {form: {username: 'temp'}}, function (err, res, body) {
        done();
      });

    });

    it('Should add withdrawel', function (done) {

      request.post('http://localhost:8000/api/withdrawel', {form: {username: 'temp', amount: '10.00'}}, function (err, res, body) {
        assert.equal(null, err);
        assert.equal(200, res.statusCode);
        assert.equal('application/json', res.headers['content-type']);
        assert.equal(-10.00, JSON.parse(body).balance);
        done();
      });

    });

    it('Should get withdrawels', function (done) {

      request('http://localhost:8000/api/withdrawels?username=temp', function (err, res, body) {
        assert.equal(null, err);
        assert.equal(200, res.statusCode);
        assert.equal('application/json', res.headers['content-type']);
        assert.equal(1, JSON.parse(body).length);
        assert.equal(10.00, JSON.parse(body)[0].amount);
        done();
      });

    });

  });

});
