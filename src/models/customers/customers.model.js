import joi from "joi";

const customersSchema = joi.object({
  name: joi.string().min(1),
  phone: joi.string().min(10).max(11),
  cpf: joi.string().min(11).max(11),
  birthday: joi
    .string()
    .pattern(
      new RegExp("^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$")
    ),
});

export default customersSchema

//nome string - nao pode ser vazio
//phone string - 10 ou 11 caracteres numericos
//cpf string - 11 caracteres de numero
//birthday pattern regex - data valida

//return 400

//conferir cpf em costumes

//return 409
