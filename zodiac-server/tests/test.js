// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("GET /", () => {

    it("should get all users", (done) => {
      chai.request(app)
        .get('/user/all')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array').that.is.not.empty;
          done();
        });
    });
  });
});