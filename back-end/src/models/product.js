import connection from "./../db";

export default class Product {
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM products", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getProductById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static getProductTop6(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM products LIMIT 6", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static createProduct(
    name,
    image,
    brand,
    price,
    discount,
    quantity,
    description,
    category_id
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO products (name,image,brand,price,discount,quantity,description,category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          image,
          brand,
          price,
          discount,
          quantity,
          description,
          category_id,
        ],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }
  static updateProduct(
    id,
    name,
    image,
    brand,
    price,
    discount,
    quantity,
    description,
    category_id
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE products SET name = ?,image = ?,brand = ?,price = ?,discount = ?,quantity = ?,description = ?,category_id = ? WHERE id = ?",
        [
          name,
          image,
          brand,
          price,
          discount,
          quantity,
          description,
          category_id,
          id,
        ],
        (err, results) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteProduct(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM products WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
