import RegExp from "../matchPattern/regExp";
import StandardDAO from "../../dao/standardObj";
import UserDAO from "../../dao/userObj";

const regExp = new RegExp();
const actionDB = new StandardDAO();
const actionUser = new UserDAO();

export default class UserValidator {

    async validateUserPOST(user) {

        try {
            const { name, email, password } = user;
            const add = { company: Number(user.id_companies), role: Number(user.id_roles), name, email, password };

            const checkRelations = await actionUser.checkRelations(add);
            if (!checkRelations.success) {
                return { success: false, message: "invalid parameters" };
            };

            const match = await regExp.match(add);
            if(!match.success) {
                return { success: false, message: match.message };
            };

            let exist = await actionDB.many({ email });
            if (exist.success) {
                return { success: false, message: "This email is already in use" };
            };

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }

    }

    async validateUserUPDATE(user) {
        try {
            const {id} = user;
            const actualUser = await actionDB.unique('users', {id: Number(id)}, user.toUpdate);
            if (!actualUser) {
                return { success: false, message: "incorrect Parameters" };
            }

            const match = await regExp.match(user);
            if(!match.success) {
                return { success: false, message: match.message };
            }

            return { success: true }
        } catch (error) {
            return { success: false, message: error.message };            
        }
    }
    
}