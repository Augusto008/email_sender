import Joi from "joi";
import StandardDAO from "../dao/standardObj";

const actionDB = new StandardDAO();

export default {

    async createCompany(req, res) {
        try {
            const { name } = req.body;
            const add = { name };

            const checker = Joi.string().pattern(/^[\p{L}\p{N}\s]+$/u).min(3).max(255).required();
            await checker.validateAsync(name).catch(error => {
                return res.status(400).json({
                    success: false, 
                    message: "Invalid name!",
                });
            });

            const exist = await actionDB.many('companies', add);
            if(exist.success === true) {
                return res.status(400).json({ message: "This name is already in use!" });
            };

            const result = await actionDB.create('companies', add);

            if (result.success !== true) {
                return res.status(400).json({ success: false, message: result.message });
            };
            return res.status(200).json({ success: true, result: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

}