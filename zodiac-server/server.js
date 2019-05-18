import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 8000;


// Configure app to use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register our routes in app
app.use('/', routes);

// Start our server
app.listen(port);
console.log(`Server started on port ${port}`);

export default app;