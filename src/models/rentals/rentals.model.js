import joi from "joi";

const rentalsBodySchema = joi.object({
    customerId: joi.number(),
    gameId: joi.number(),
    daysRented: joi.number().min(1),
})

export default rentalsBodySchema