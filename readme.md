# Bank-API

Bank API for Seeds.

Includes API endpoints for creating/deleting users and adding deposits/withdrawels.  

## Usage

### Server

Make sure to have rethinkdb and node installed  
Make sure to start rethink before server

##### Start rethink
`node rethinkdb`
##### Start server
`node index.js`

### Client
##### Add user
`curl --data 'username=something' http://localhost:8000/api/add`  
##### Add deposit
`curl --data 'username=something&amount=10.00' http://localhost:8000/api/deposit`  
##### Get deposits
`curl http://localhost:8000/api/deposits?username=something`

### Test
`npm test`

## API

### Error codes

`400`  
incorrect format  
i.e. url format incorrect

`422`  
Unprossed request  
i.e. try to add user that already exists

### Endpoints

All endpoints begin with: http://localhost:8000/api

##### GET /
##### GET /deposits/username
##### GET /withdrawels/username
##### POST /add/username
##### POST /delete/username
##### POST /deposit/username/amount
##### POST /withdrawel/username/amount

#### GET /
*Return* `JSON`

Get api endpoints

`curl http://localhost:8000/api`

#### GET /deposits/username
*Return* `JSON`

Get user deposits

`curl http://localhost:8000/api/deposits?username=[username]`

#### GET /withdrawels/username
*Return* `JSON`

Get user withdrawels

`curl http://localhost:8000/api/withdrawels?username=[username]`

#### POST /add/username
*Return* `TEXT`

Add user

`curl --data 'username=[username]' http://localhost:8000/api/add`

#### POST /delete/username
*Return* `TEXT`

Delete user

`curl --data 'username=[username]' http://localhost:8000/api/delete`

#### POST /deposit/username/amount
*Return* `JSON`

Add deposit. Balance is returned

`curl --data 'username=[username]&amount=[amount]' http://localhost:8000/api/deposit`

#### POST /withdrawel/username/amount
*Return* `JSON`

Add withdrawel. Balance is returned

`curl --data 'username=[username]&amount=[amount]' http://localhost:8000/api/withdrawel`

## Install

Make sure to have rethinkdb and node installed

```git clone https://github.com/egul/bank-api.git```

## License
MIT
