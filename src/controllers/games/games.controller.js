import connection from "../../database/index.js";

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.data;

  try {
    await connection.query(
      'INSERT INTO games (name,image,"stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2,$3,$4,$5)',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getGames(req, res) {
  const { name } = req.query;

  try {
    if (!name) {
      const gameList = await connection.query(
        'SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;'
      );
      res.status(200).send(gameList.rows);
    } else {
      const gameList = await connection.query(
        'SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name LIKE $1;',
        [name + "%"]
      );
      res.status(200).send(gameList.rows);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
