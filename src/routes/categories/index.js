import connection from "../../database/index.js";
import express from "express";

const categoriesRoute = express.Router();

categoriesRoute.get("/categories", async (req, res) => {
  const resposta = await connection.query("SELECT * FROM categories;");
  res.send(resposta.rows);
});

categoriesRoute.post("/categories", async (req, res) => {
  
  const { name } = req.body;

  if(name === ''){
    return res.status(400).send('nome nao pode estar vazio')
  }

   await connection.query(
    "INSERT INTO categories (name) VALUES ($1);",
    [name]
  );

  res.status(201).send("inserido em categorias")
});

export { categoriesRoute };
