const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const HOST = 'http://localhost';
const STATIC = '../client/dist';
const PORT = 3001;

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

app.post('/api/subscribe', (request, response)=>{
  const {subscription, user, type} = request.body;
  console.log(subscription);
  console.log(`${type}: ${user}, [${subscription.endpoint}]`);

  response.write(JSON.stringify({ok: true, user}));
  response.end();
});
