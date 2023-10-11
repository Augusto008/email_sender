import RegExp from "../matchPattern/regExp";
import StandardDAO from "../../dao/standardObj";

const regExp = new RegExp();
const actionDB = new StandardDAO();

export default class JobValidator {

    async validateJobPOST(job) {
        try {
            const match = await regExp.match(job);
            if(!match.success) {
                return { success: false, message: match.message };
            }

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

}