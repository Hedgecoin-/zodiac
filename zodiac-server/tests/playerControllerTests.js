// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import db from '../models/dbconnection';

chai.use(chaiHttp);
chai.should();

const testUserCredentials = {
  username: "test",
  password: "test"
}
const newPlayer = {
  playerName: "unit",
  userId: 1,
}

describe("Player Controller Tests", () => {
  let authenticatedUser = chai.request.agent(app);

  before((done) => {
    authenticatedUser
      .post('/user/login')
      .send(testUserCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.include.keys("username");
        res.body.username.should.equal(testUserCredentials.username);
        done();
      })
  });

  describe("POST /player/create", () => {
    it("should create a new player", (done) => {
      authenticatedUser
        .post('/player/create')
        .send(newPlayer)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.include.keys("playerName");
          res.body.playerName.should.equal(newPlayer.playerName);
          db.query(`DELETE FROM players WHERE (playerName = ?)`, [newPlayer.playerName])
            .then(() => {
              done();
            });
        });
    });
    it("should fail with missing playerName", (done) => {
      authenticatedUser
        .post('/player/create')
        .send({
          userId: 1,
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.include.keys('error');
          done();
        });
    });
    it("should fail with missing userId", (done) => {
      authenticatedUser
        .post('/player/create')
        .send({
          playerName: "Player"
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.include.keys('error');
          done();
        });
    });
    it("should redirect to login if not authenticated", (done) => {
      chai.request(app)
        .post('/player/create')
        .redirects(0)
        .send(newPlayer)
        .end((err, res) => {
          res.should.have.status(302);
          res.headers.location.should.equal('/user/login');
          done();
        })
    });
  });

  describe("POST /player/delete", () => {
    it("should delete a new player", (done) => {
      db.query(`SELECT * FROM players WHERE playerName = ?`, [newPlayer.playerName])
        .then(result => {
          if (result.length === 0) {
            return new Promise((resolve, reject) => {
              db.query(`INSERT INTO players (userId, playerName) VALUES(?, ?)`, [newPlayer.userId, newPlayer.playerName])
                .then(() => resolve())
                .catch(() => reject())
            });
          }
          return;
        })
        .then(() => {
          authenticatedUser
            .post('/player/delete')
            .send(newPlayer)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.include.keys('message');
              done();
            });
        });
    });
    it("should fail with missing playerName", (done) => {
      authenticatedUser
        .post('/player/delete')
        .send({})
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.include.keys('error');
          done();
        });
    });
    it("should redirect to login if not authenticated", (done) => {
      chai.request(app)
        .post('/player/delete')
        .redirects(0)
        .send(newPlayer)
        .end((err, res) => {
          res.should.have.status(302);
          res.headers.location.should.equal('/user/login');
          done();
        });
    });
  });

  // describe("POST /player/update", () => {
  //   let playerId, playerScore;
  //   before((done) => {
  //     db.query(`INSERT INTO players (userId, playerName) VALUES(?, ?)`, [newPlayer.userId, newPlayer.playerName])
  //       .then(() => {
  //         db.query(`SELECT * FROM players WHERE userId = ? AND playerName = ?`, [newPlayer.userId, newPlayer.playerName])
  //           .then(result => {
  //             if (result.length === 1) {
  //               playerId = result[0].id;
  //               playerScore = result[0].score;
  //               done();
  //             }
  //             else {
  //               throw new Error("More than 1 result");
  //             }
  //           });
  //       });
  //   });
  //   it("should increase score", (done) => {
  //     authenticatedUser
  //       .post('/player/update')
  //       .send({
  //         id: playerId,
  //         userId: newPlayer.userId,
  //         field: 'score',
  //         value: 1,
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.include.keys('message');

  //       })
  //   });
  // });

  describe("GET /player/all", () => {
    it("should get all players", (done) => {
      authenticatedUser
        .get('/player/all')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array').that.is.not.empty;
          done();
        });
    });

    it("should redirect to login if not authenticated", (done) => {
      chai.request(app)
        .get('/player/all')
        .redirects(0)
        .end((err, res) => {
          res.should.have.status(302);
          res.headers.location.should.equal('/user/login');
          done();
        })
    });
  });

  describe("GET /player/:id", () => {
    let playerId;
    before((done) => {
      db.query(`INSERT INTO players (userId, playerName) VALUES(?, ?)`, [newPlayer.userId, newPlayer.playerName])
        .then(() => {
          db.query(`SELECT * FROM players WHERE userId = ? AND playerName = ?`, [newPlayer.userId, newPlayer.playerName])
            .then(result => {
              if (result.length === 1) {
                playerId = result[0].id;
                done();
              }
              else {
                throw new Error("More than 1 result");
              }
            });
        });
    });
    it("should get player by id", (done) => {
      authenticatedUser
        .get(`/player/${playerId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.include.keys("playerName");
          res.body.playerName.should.equal(newPlayer.playerName);
          done();
        });
    });

    it("should redirect to login if not authenticated", (done) => {
      chai.request(app)
        .get(`/player/${playerId}`)
        .redirects(0)
        .end((err, res) => {
          res.should.have.status(302);
          res.headers.location.should.equal('/user/login');
          done();
        })
    });

    after((done) => {
      db.query(`DELETE FROM players WHERE id = ?`, [playerId])
        .then(() => done());
    });
  });
});