import Joi from "joi";

export default  class RegExp {

    async match(data) {
        try {
            
            const match = Joi.object({
                contact: Joi.string(),
                body: Joi.string(),
                description: Joi.string(),
                email: Joi.string().email().max(100),
                footer: Joi.any().optional(),
                logo: Joi.string().max(50),
                name: Joi.string().pattern(/^[\p{L}\p{N}\s]+$/u).min(3).max(255),
                password: Joi.string(),
                replier: Joi.string().email().max(100),
                sender: Joi.string().email().max(100),
                title: Joi.string().pattern(/^[\p{L}\p{N}\s]+$/u).min(3).max(255),
                url: Joi.string(),
            });

            for (const check in data) {
                if (match.describe().keys[check]) {
                    await match.validateAsync({ [check]: data[check] }).catch(error => { throw new Error (`invalide type: ${check}`); });
                } else if (check === 'requirements' && typeof(data[check]) !== 'object') {
                    return { success: false, message: "Invalid type: requirements" };
                };
            }

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

}