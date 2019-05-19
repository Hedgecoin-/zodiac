import express from 'express';
import session from 'express-session';
import mySqlStore from 'express-mysql-session';
import bodyParser from 'body-parser';
import routes from './routes/index';
import db from './models/dbconnection';

const app = express();
const port = process.env.PORT || 8000;


// Configure app middleware
const sessionStore = new mySqlStore({}, db.connection);
app.use(session({
  key: '9dkSdo3lF4RdsldI60L',
  secret: '6l0QhOUWPAulIJWqCelK',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register routes
app.use('/', routes);

// Start server
app.listen(port);
console.log(`Server started on port ${port}`);

export default app;