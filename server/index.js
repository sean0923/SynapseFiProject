const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/apiUser');

const nodeRoutes = require('./routes/apiNode');
const transactionRoutes = require('./routes/apiTransaction');

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use('/api/user', userRoutes);
app.use('/api/node', nodeRoutes);
app.use('/api/transaction', transactionRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

