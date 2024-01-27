const express = require('express');
const bodyParser = require('body-parser');
const prisma = require('./prisma');
const authRouter = require('./routers/authRouter');
const dotenv = require('dotenv');
const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


