import db from "../config/database.js";

export const getCards = (result) => {
    db.query("SELECT * FROM cards", (err, results) => {
        if(err){
            console.log(err);
            result(err, null);
        }else{
            result(null, results);
        }
    });
}

export const getCard = (id, result) => {
    db.query("SELECT * FROM cards WHERE CardDefId = ?",id,(err, results) =>{
        if(err){
            console.log(err);
            result(err, null);
        }else{
            result(null, results[0]);
        }
    });
}