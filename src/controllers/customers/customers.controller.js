import connection from "../../database/index.js";

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = res.locals.data;

  try {
    await connection.query(
      "INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)",
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
}

export async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    if (!cpf) {
      const customersList = await connection.query("SELECT * FROM customers");
      return res.status(200).send(customersList.rows);
    } else {
      const customersList = await connection.query(
        "SELECT * FROM customers WHERE cpf LIKE $1",
        [cpf + "%"]
      );
      return res.status(200).send(customersList.rows);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
