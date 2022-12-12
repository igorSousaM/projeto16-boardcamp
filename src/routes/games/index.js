import express from "express";
import { getGames, postGames } from "../../controllers/games/games.controller.js";
import { validatePostGames } from "../../middleware/games/games.middleware.js";

const gameRoute = express.Router();

gameRoute.get("/games", getGames);

gameRoute.post("/games",validatePostGames, postGames);

export { gameRoute };
