import connection from "../../database/index.js";

export async function getCategories(req, res) {
  try {
    const categoriesList = await connection.query("SELECT * FROM categories;");
    res.send(categoriesList.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postCategories(req, res) {
  const name = res.locals.name;
try{
  await connection.query("INSERT INTO categories (name) VALUES ($1);", [name]);
  res.status(201).send("inserido em categorias");
}catch(err){
    console.log(err)
    res.sendStatus(500)
}
}
