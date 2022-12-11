import connection from "../../database/index.js";
import express  from "express";

const categoriesRoute = express.Router()

categoriesRoute.get("/", async (req, res) => {
    const resposta = await connection.query("SELECT * FROM categories;");
    res.send(resposta.rows);
  });


export {categoriesRoute}