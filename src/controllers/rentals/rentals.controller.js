import connection from "../../database/index.js";

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;

  try {
    const rentalsList = await connection.query("SELECT * FROM rentals;");
    res.status(200).send(rentalsList.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postRentals(req, res) {
  const {
    customerId,
    gameId,
    daysRented,
    rentDate,
    originalPrice,
    returnDate,
    delayFee,
  } = res.locals.data;

  try {
    await connection.query(
      'INSERT INTO rentals ("customerId","gameId","daysRented","rentDate","originalPrice","returnDate","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)',
      [
        customerId,
        gameId,
        daysRented,
        rentDate,
        originalPrice,
        returnDate,
        delayFee,
      ]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteRentals(req, res) {
  const id = res.locals.id;
  try{
    await connection.query('DELETE FROM rentals WHERE id=$1',[id])
    res.sendStatus(200)
}catch(err){
    console.log(err)
    res.sendStatus(500)
  }

}
