import connection from "./../db";

export default class User {
  static createUser(name, email, password, role_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO user (name, email, password, role_id) VALUES (?, ?, ?, 2)",
        [name, email, password, role_id],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM user", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getAllUsersRole() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT user.id, user.email,user.phone,user.name,user.img, user.role_id, role.name as nameRole FROM user JOIN  role on user.role_id = role.id", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getUserById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }
  static checkEmailExists(email) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (err, results) => {
          if (err) reject(err);
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  }
  static resetPassword(email, password) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET password = ? WHERE email = ?",
        [password, email],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static updateUserRole(id, role_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET role_id = ? WHERE id = ?",
        [role_id, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
