// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

const testUserCredentials = {
  username: "test",
  password: "test"
}
const testUserCredentialsWrong = {
  username: "test",
  password: "wrong"
}
const registerTestUser = {
  username: "unit",
  password: "testword",
}

describe("User Controller Tests", () => {
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

  describe("POST /user/login", () => {
    it("should log in with correct credentials", (done) => {
      chai.request(app)
        .post('/user/login')
        .send(testUserCredentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.include.keys("username");
          res.body.username.should.equal(testUserCredentials.username);
          done();
        });
    });
    it("should fail with incorrect credentials", (done) => {
      chai.request(app)
        .post('/user/login')
        .send(testUserCredentialsWrong)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.include.keys('error');
          done();
        });
    });
  });

  describe("POST /user/register", () => {
    it("should be able to add a new user", (done) => {
      chai.request(app)
        .post('/user/register')
        .send(registerTestUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.include.keys("username");
          res.body.username.should.equal(registerTestUser.username);
          done();
        });
    });
  });

  describe("POST /user/delete", () => {
    it("should be able to remove the new user", (done) => {
      authenticatedUser
        .post('/user/delete')
        .send(registerTestUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.include.keys("message");
          done();
        });
    })

    it("should redirect to login if not authenticated", (done) => {
      chai.request(app)
        .post('/user/delete')
        .redirects(0)
        .send(registerTestUser)
        .end((err, res) => {
          res.should.have.status(302);
          res.headers.location.should.equal('/user/login');
          done();
        })
    })
  });

  describe("GET /user/all", () => {
    it("should get all users", (done) => {
      authenticatedUser
        .get('/user/all')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array').that.is.not.empty;
          done();
        });
    });

    it("should redirect to login if not authenticated", (done) => {
      chai.request(app)
        .get('/user/all')
        .redirects(0)
        .end((err, res) => {
          res.should.have.status(302);
          res.headers.location.should.equal('/user/login');
          done();
        })
    });
  });
});