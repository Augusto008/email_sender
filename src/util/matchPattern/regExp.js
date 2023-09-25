import Joi from "joi";

export default  class RegExp {

    async nameMatch(data) {

        try {
            const match = Joi.string().pattern(/^[\p{L}\p{N}\s]+$/u).min(3).max(255).required();
            await match.validateAsync(data);
            return { success: true };
        } catch (error) {
            return { success: false, message: "Invalid name" };
        }

    }

}