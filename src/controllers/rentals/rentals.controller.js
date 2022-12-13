import connection from "../../database/index.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;
  console.log(gameId);
  try {
    if ((customerId !== undefined) & (gameId !== undefined)) {
      const rentalsList = await connection.query(
        `SELECT rentals.*, 
         games.name as "gameName", games."categoryId",
         customers.name as "customerName",
         categories.name as "categoryName"
         FROM rentals 
         JOIN games ON rentals."gameId" = games.id 
         JOIN categories ON games."categoryId" = categories.id
         JOIN customers ON rentals."customerId"=customers.id
         WHERE games.id = $1 AND customers.id=$2;`,
        [gameId, customerId]
      );

      rentalsList.rows.map((rental) => {
        rental.customer = {
          id: rental.customerId,
          name: rental.customerName,
        };
        rental.game = {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.categoryName,
        };

        delete rental.customerName;
        delete rental.gameName;
        delete rental.categoryId;
        delete rental.categoryName;
      });

      res.status(200).send(rentalsList.rows);
    } else if ((customerId === undefined) & (gameId !== undefined)) {
      const rentalsList = await connection.query(
        `SELECT rentals.*, 
         games.name as "gameName", games."categoryId",
         customers.name as "customerName",
         categories.name as "categoryName"
         FROM rentals 
         JOIN games ON rentals."gameId" = games.id 
         JOIN categories ON games."categoryId" = categories.id
         JOIN customers ON rentals."customerId"=customers.id
         WHERE games.id = $1;`,
        [gameId]
      );

      rentalsList.rows.map((rental) => {
        rental.customer = {
          id: rental.customerId,
          name: rental.customerName,
        };
        rental.game = {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.categoryName,
        };

        delete rental.customerName;
        delete rental.gameName;
        delete rental.categoryId;
        delete rental.categoryName;
      });

      res.status(200).send(rentalsList.rows);
    } else if ((customerId !== undefined) & (gameId === undefined)) {
      const rentalsList = await connection.query(
        `SELECT rentals.*, 
         games.name as "gameName", games."categoryId",
         customers.name as "customerName",
         categories.name as "categoryName"
         FROM rentals 
         JOIN games ON rentals."gameId" = games.id 
         JOIN categories ON games."categoryId" = categories.id
         JOIN customers ON rentals."customerId"=customers.id
         WHERE customers.id = $1;`,
        [customerId]
      );

      rentalsList.rows.map((rental) => {
        rental.customer = {
          id: rental.customerId,
          name: rental.customerName,
        };
        rental.game = {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.categoryName,
        };

        delete rental.customerName;
        delete rental.gameName;
        delete rental.categoryId;
        delete rental.categoryName;
      });

      res.status(200).send(rentalsList.rows);
    } else {
      const rentalsList = await connection.query(
        `SELECT rentals.*, 
         games.name as "gameName", games."categoryId",
         customers.name as "customerName",
         categories.name as "categoryName"
         FROM rentals 
         JOIN games ON rentals."gameId" = games.id 
         JOIN categories ON games."categoryId" = categories.id
         JOIN customers ON rentals."customerId"=customers.id;`
      );

      rentalsList.rows.map((rental) => {
        rental.customer = {
          id: rental.customerId,
          name: rental.customerName,
        };
        rental.game = {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.categoryName,
        };

        delete rental.customerName;
        delete rental.gameName;
        delete rental.categoryId;
        delete rental.categoryName;
      });

      res.status(200).send(rentalsList.rows);
    }
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
  try {
    await connection.query("DELETE FROM rentals WHERE id=$1", [id]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function returnRentals(req, res) {
  const rental = res.locals.data;

  const newReturnDate = dayjs().format("YYYY-MM-DD");
  //calcular dleayFee
  const newDelayFee = dayjs();
  //console.log(dayjs().subtract(10,'day').format("YYYY-MM-DD"))

  try {
    await connection.query(
      'UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 ',
      [newReturnDate, newDelayFee]
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  res.send(rental.rows);
}
