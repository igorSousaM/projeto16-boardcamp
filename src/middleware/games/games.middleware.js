import connection from "../../database/index.js";
import { gamesSchema } from "../../models/games/games.model.js";

export async function validatePostGames(req, res, next) {
  const data = req.body;

  const { error } = gamesSchema.validate(data, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const foundId = await connection.query(
      "SELECT * FROM categories WHERE id=$1",
      [data.categoryId]
    );
    if (foundId.rows.length === 0) {
      return res.sendStatus(400);
    }

    const nameExist = await connection.query(
      "SELECT * FROM games WHERE name=$1",
      [data.name]
    );
    if (nameExist.rows[0]) {
      return res.sendStatus(409);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  res.locals.data = data;

  next();
}
