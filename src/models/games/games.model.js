import joi from "joi";

const gamesSchema = joi.object({
  name: joi.string().min(1),
  image: joi.string(),
  stockTotal: joi.number().min(1),
  categoryId: joi.number(),
  pricePerDay: joi.number().min(1),
});

export {gamesSchema}