import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "asm-web209",
});
export default connection;
