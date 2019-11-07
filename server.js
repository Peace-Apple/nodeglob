import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './src/modules/user';

const port = 8800;

const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);

app.use('/api/user', userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
