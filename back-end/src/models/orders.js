import connection from "./../db";

export default class Orders {
  static getProductByUserId(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM orders WHERE userId = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  } 
  static createOrder(
    name,
    userId,
    productId,
    image,
    price,
    quantity,
    quantityProduct
  ) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO orders (name,userId,productId,image,price,quantity,quantityProduct) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          name,userId,productId,image,price,quantity,quantityProduct
        ],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }
  static updateOrder(id,quantity) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE orders SET quantity =  ? WHERE id = ?",
        [quantity,id],  
        (err, results) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteOrder(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM orders WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
