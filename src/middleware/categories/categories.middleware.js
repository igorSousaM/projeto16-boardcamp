import connection from "../../database/index.js";
import { nameSchema } from "../../models/categories/categories.model.js";

export async function validatePostCategories(req, res, next) {
  const { name } = req.body;

  const { error } = nameSchema.validate(name);
  if (error) {
    return res.status(400).send(error.message);
  }
  try {
    const nameExist = await connection.query(
      "SELECT * FROM categories WHERE name=$1;",
      [name]
    );

    if (nameExist.rows[0] && nameExist.rows[0].name === name) {
      return res.status(400).send("já tem esse cadastrado!");
    }


  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  res.locals.name = name;

  next();
}
