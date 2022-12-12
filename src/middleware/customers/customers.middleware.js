import connection from "../../database/index.js"
import customersSchema from "../../models/customers/customers.model.js"

export async function validadePostCustomers(req,res,next){
    
    const customersData = req.body

    const {error} = customersSchema.validate(customersData,{abortEarly:false})
    if(error){
        const errors = error.details.map(detail=>detail.message)
        return res.status(400).send(errors)
    }

    try{
        const findCpf = await connection.query('SELECT * FROM customers WHERE cpf=$1',[customersData.cpf])
        if(findCpf.rows[0]){
            return res.status(409).send("ja existe esse cpf")
        }

        res.locals.data = customersData
        next();

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}