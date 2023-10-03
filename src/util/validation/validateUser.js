import RegExp from "../matchPattern/regExp";
import StandardDAO from "../../dao/standardObj";
import UserDAO from "../../dao/userObj";

const regExp = new RegExp();
const actionDB = new StandardDAO();
const actionUser = new UserDAO();

export default class UserValidator {

    async validateUserPOST(user) {

        try {
            const checkRelations = await actionUser.checkRelations(user);
            if (!checkRelations.success) {
                return { success: false, message: "invalid parameters" };
            };

            const match = await regExp.match(user);
            if(!match.success) {
                return { success: false, message: match.message };
            };

            let exist = await actionDB.many('users', { email: user.email });
            if (exist.result.length > 0) {
                return { success: false, message: "This email is already in use" };
            };

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }

    }

    async validateUserUPDATE(user) {
        try {
            const actualUser = await actionDB.unique('users', {id: Number(user.id)});
            if (!actualUser) {
                return { success: false, message: "incorrect Parameters" };
            }

            const match = await regExp.match(user);
            if(!match.success) {
                return { success: false, message: match.message };
            }

            let exist = await actionDB.many('users', { email: user.email });
            if (exist.result.length > 0) {
                return { success: false, message: "This email is already in use" };
            };

            return { success: true }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
    
}