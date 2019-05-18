import db from '../models/dbconnection';

class UserController {
  static getAllUsers(req, res) {

    let users = [];

    db.query(`SELECT * FROM users;`)
      .then(rows => {
        users = rows;
      })
      .then(() => db.close())
      .then(() => {
        return res.status(200).json(users)
      })
  }

  // static getSingleUser(req, res) {


  //   const findUser = users.find(u => u.id === parseInt(req.params.id, 10));
  //   if (findUser) {
  //     return res.status(200).json({
  //       user: findUser,
  //       message: "A single user",
  //     });
  //   }
  //   return res.status(404).json({
  //     message: "User not found",
  //   });
  // }
}
export default UserController;