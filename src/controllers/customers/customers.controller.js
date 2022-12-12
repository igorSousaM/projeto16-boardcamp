import connection from "../../database/index.js";

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = res.locals.data;

  try {
    await connection.query(
      "INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)",
      [name, phone, cpf, birthday]
    );
    res.status(201).send("foi")
  } catch (err) {
    console.log(err);
  }
}
