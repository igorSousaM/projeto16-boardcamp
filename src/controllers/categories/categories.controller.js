import connection from "../../database/index.js";

export async function getCategories(req, res) {
  const categoriesList = await connection.query("SELECT * FROM categories;");
  res.send(categoriesList.rows);
}

export async function postCategories(req, res) {
  const name = res.locals.name;

  await connection.query("INSERT INTO categories (name) VALUES ($1);", [name]);

  res.status(201).send("inserido em categorias");
}
