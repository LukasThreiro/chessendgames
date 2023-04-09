import express from "express";
import Stockfish from "../services/stockfishChessEngine.js"
import DBConnection from "../services/dbConnection.js"

const router = express.Router();

router.post("/analysePosition", async function(req, res) {
    try {
        var fen = req.body["fen"];
        var stockfish = new Stockfish();
        var response = await stockfish.analysePosition(fen, 12, 1);
        res.json(response);
    } catch (error) {
        return res.status(400).json({status: 400, message: "Unknown error"});
    }
});

router.post("/endgameTypes", async function(req, res) {
    var conn = new DBConnection();
    var response = await conn.getEndgameTypes();
    res.json(response);
});

router.post("/positions", async function(req, res) {
    try {
        var symbol = req.body["symbol"];
    } catch (error) {
        return res.status(400).json({status: 400, message: "Cannot find arguments"});
    }

    if ((symbol == "") || (symbol == undefined)) {
        return res.status(400).json({status: 400, message: "SYMBOL must be present"});
    }
    
    var conn = new DBConnection();
    var response = await conn.getPositions(symbol);
    res.json(response);
});

export default router;