import mysql from 'mysql';

const connectionInfo = {
  host: 'localhost',
  user: 'root',
  password: 'KmhtEBemxgSW5viu8dGl',
  database: 'zodiac_test',
};


class Database {
  constructor() {
    this.connection = mysql.createConnection(connectionInfo);
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err)
        resolve(rows)
      })
    })
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
}

// const connection = mysql.createConnection(connectionInfo);
// connection.connect(err => {
//   if (err) return console.error(`Error connection: ${err.stack}`);

//   console.log(`Connected as id ${connection.threadId}`);
// });

export default new Database();