import Joi from "joi";

export default  class RegExp {

    async match(data) {
        try {
            
            const match = Joi.object({
                name: Joi.string().pattern(/^[\p{L}\p{N}\s]+$/u).min(3).max(255),
                email: Joi.string().email(),
                password: Joi.string(),
            });
            
            let test;

            for (const check in data) {
                if (match.describe().keys[check]) {
                    await match.validateAsync({ [check]: data[check] }).catch(error => { throw new Error (`invalide type: ${check}`); });
                };
            }

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

}