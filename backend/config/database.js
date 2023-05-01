import mysql from "mysql2";

const db=mysql.createConnection({
    host: "db4free.net",
    user:"marvelsnapick",
    password:"Marame1230!",
    database:"marvelsnapick_db"
});

export default db;