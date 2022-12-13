import dayjs from "dayjs";
import connection from "../../database/index.js";
import rentalsBodySchema from "../../models/rentals/rentals.model.js";

export async function validatePostRentals(req, res, next) {
  const body = req.body;

  const { error } = rentalsBodySchema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const customer = await connection.query(
      "SELECT * FROM customers WHERE id=$1",
      [body.customerId]
    );

    if (customer.rows.length === 0) {
      return res.status(400).send("customer nao existente");
    }

    const game = await connection.query("SELECT * FROM games WHERE id=$1", [
      body.gameId,
    ]);

    if (game.rows.length === 0) {
      return res.status(400).send("game nao existente");
    }

    const rentalsData = {
      ...body,
      rentDate: dayjs().format("YYYY-MM-DD"),
      originalPrice: body.daysRented * game.rows[0].pricePerDay,
      returnDate: null,
      delayFee: null,
    };

    res.locals.data = rentalsData;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
