import db from '../models/dbconnection';

class UserController {
  static login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
      db.query(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password])
        .then(result => {
          if (result.length > 0) {
            let { username, id } = result[0];
            req.session.loggedIn = true;
            req.session.username = username;
            req.session.userId = id;
            res.status(200).json({
              username: username,
              userId: id,
              message: 'Logged in successfully'
            });
          }
          else {
            res.status(401).json({
              error: 'Incorrect username and/or password'
            });
          }
        })
    }
  }

  static getAllUsers(req, res) {
    // if we're not logged in
    let session = req.session;
    if (!session.username) {
      res.status(302).redirect('/user/login');
      return;
    }

    db.query(`SELECT * FROM users;`)
      .then(rows => {
        res.status(200).json(rows)
      })
      .catch(err => {
        res.status(500).json({
          error: `Error getting all users ${err}`
        });
      });
  }

  static register(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
      db.query(`SELECT * FROM users WHERE username = ?`, [username])
        .then(result => {
          if (result.length === 0) {
            return new Promise((resolve, reject) => {
              db.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password])
                .then(() => resolve(true))
                .catch(() => reject(false))
            });
          }
          return false;
        })
        .then(registered => {
          if (registered) {
            req.session.loggedIn = true;
            req.session.username = username;
            res.status(200).json({
              username: username,
              message: 'Registered and logged in successfully'
            });
          }
          else {
            res.status(409).json({
              error: 'Username already exists'
            });
          }
        });
    }
  }

  static delete(req, res) {
    let session = req.session;
    let usernameToDelete = req.body.username;

    // if we're not logged in
    if (!session.username) {
      res.status(302).redirect('/user/login');
      return;
    }

    // if we forgot the username
    if (!usernameToDelete) {
      res.status(422).json({
        error: "Missing username to delete"
      });
      return;
    }

    db.query(`DELETE FROM users WHERE (username = ?);`, [usernameToDelete])
      .then(() => {
        res.status(200).json({
          message: "Success"
        })
      })
  }
}
export default UserController;