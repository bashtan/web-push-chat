const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require( 'axios');
const app = express();

const config = require( './config.json');
const HOST = 'http://localhost';
const STATIC = '../client/dist';
const PORT = 3001;

let users = [];
let messages = [];

const addUser = ({token:newToken, name}) => {
  const existUser = users.find(({token}) => token === newToken);
  if(!existUser)
    users.push({token: newToken, name: 'unknown user'});
  else
    existUser.name = name
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, STATIC)));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', 'http://localhost:3001/');
  response.header('Access-Control-Allow-Credentials', true);
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, () => {
  console.log(`Chat started on port ${HOST}:${PORT}`);
});

app.get('/api/messages', (request, response)=>{
  response.write(JSON.stringify({messages}));
  response.end();
});

app.get('/api/users', (request, response)=>{
  response.write(JSON.stringify({users}));
  response.end();
});

app.post('/api/subscribe', (request, response)=>{
  const {token} = request.body;
  console.log(token);
  addUser({token});
  response.write(JSON.stringify({ok: true, users}));
  response.end();
});

app.post('/api/message', (request, response)=>{
  const {token, sender, text} = request.body;
  const {key, url} = config;
  addUser({token, name: sender});
  console.log('Recieve message from ', sender);

  messages.push({token, sender, text});
  users.forEach(({token:target})=>{
    if(token !== target)
    axios({
      method: 'POST',
      url: url,
      headers: {
        'Authorization': `key=${key}`,
        'Content-Type': 'application/json'
      },
      json: true,
      data: JSON.stringify({
        to: target,
        data: {
          text,
          sender: sender,
          users
        }
      })
    })
      .then((res) => {
        console.log('success send');
      })
      .catch(e => {
        console.log('error send', e);
      });
  });

  response.write(JSON.stringify({ok: true}));
  response.end();
});

