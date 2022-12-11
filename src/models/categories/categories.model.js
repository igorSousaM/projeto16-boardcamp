import joi from "joi"

const nameSchema = joi.string().min(1)

export{nameSchema} 