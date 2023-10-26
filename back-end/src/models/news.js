import connection from "../db";
export default class News {
  static getAllNews() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM news", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getNewsById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM news WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }
  static createNews(name, image, description) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO news (name, image, description) VALUES (?, ?, ?)",
        [name, image, description],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }
  static updateNews(id, name, image, description) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE news SET name = ?, image = ?, description = ? WHERE id = ?",
        [name, image, description, id],
        (err, results) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteNews(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM news WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
