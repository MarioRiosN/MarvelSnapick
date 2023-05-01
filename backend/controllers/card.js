import{
    getCards,
    getCard
}from "../models/CardModel.js";

export const showCards = (req, res) => {
    getCards((err, results) => {
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
};

export const showCard = (req, res) => {
    getCards(req.params.id,(err, results) => {
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
};