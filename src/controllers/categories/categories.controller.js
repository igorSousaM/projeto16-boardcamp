import connection from "../../database/index.js";

export async function getCategories(req, res) {
  const resposta = await connection.query("SELECT * FROM categories;");
  res.send(resposta.rows);
}

export async function postCategories(req, res) {
    const { name } = req.body;

    if(name === ''){
      return res.status(400).send('nome nao pode estar vazio')
    }
  
     await connection.query(
      "INSERT INTO categories (name) VALUES ($1);",
      [name]
    );
  
    res.status(201).send("inserido em categorias")
}
