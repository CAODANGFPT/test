import connection from "./../db";

export default class Category {
  static getAllCategory() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM category", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getCategoryById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM category WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static getAllProductsCate(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT c.name, p.id, p.name, p.image, p.brand, p.price, p.discount, p.quantity, p.description FROM category c JOIN products p ON c.id = p.category_id WHERE c.id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static createCategory(name, image) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO category (name, image) VALUES (?, ?)",
        [name, image],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }
  static updateCategory(id, name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE category SET name = ? WHERE id = ?",
        [name, id],
        (err, results) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteCategory(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM category WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
