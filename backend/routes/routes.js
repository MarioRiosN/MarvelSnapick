import express from "express";

import{
    showCards,
    showCard,
}from "../controllers/card.js";

const router = express.Router();

router.get("/cards", showCards);

router.get("/cards/:id", showCard);

export default router;