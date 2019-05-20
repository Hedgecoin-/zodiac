import db from '../models/dbconnection';

class PlayerController {
  static createPlayer(req, res) {
    // if we're not logged in
    let session = req.session;
    if (!session.username) {
      res.status(302).redirect('/user/login');
      return;
    }


    let playerName = req.body.playerName;
    let userId = req.body.userId;
    if (!playerName || !userId) {
      res.status(422).json({
        error: "Missing 'playerName' or 'userId' parameter"
      });
      return;
    }

    db.query(`INSERT INTO players (userId, playerName) VALUES (?, ?)`, [userId, playerName])
      .then(() => {
        res.status(200).json({
          playerName: playerName,
          message: 'Created player successfully'
        });
      })
      .catch(err => {
        res.status(500).json({
          error: `Error creating player: ${err}`
        });
      })
  }

  static deletePlayer(req, res) {
    let session = req.session;
    if (!session.username) {
      res.status(302).redirect('/user/login');
      return;
    }

    let playerName = req.body.playerName;
    let userId = req.body.userId;
    if (!playerName || !userId) {
      res.status(422).json({
        error: "Missing parameter 'playerName' or 'userId' parameter"
      });
      return;
    }

    db.query(`DELETE FROM players where playerName = ? AND userId = ?`, [playerName, userId])
      .then(() => {
        res.status(200).json({
          message: 'Delete player successfully'
        });
      })
      .catch(err => {
        res.status(500).json({
          error: `Error deleting player: ${err}`
        });
      });
  }

  static getAllPlayers(req, res) {
    // if we're not logged in
    let session = req.session;
    if (!session.username) {
      res.status(302).redirect('/user/login');
      return;
    }

    db.query(`SELECT * FROM players;`)
      .then(rows => {
        res.status(200).json(rows)
      })
      .catch(err => {
        res.status(500).json({
          error: `Error getting all players ${err}`
        });
      });
  }

  static getById(req, res) {
    let session = req.session;
    if (!session.username) {
      res.status(302).redirect('/user/login');
      return;
    }

    let playerId = req.params.id;
    if (!playerId) {
      res.status(422).json({
        error: "Missing playerId parameter"
      });
      return;
    }

    db.query(`SELECT * FROM players WHERE id = ?`, [playerId])
      .then(result => {
        if (result.length === 1) {
          res.status(200).json(result[0]);
        }
        else {
          res.status(401).json({
            error: `Error getting player by id ${result}`
          });
        }
      });
  }

}

export default PlayerController;