import RegExp from "../matchPattern/regExp";
import StandardDAO from "../../dao/standardObj";

const regExp = new RegExp();
const actionDB = new StandardDAO();

export default class RoleValidator {

    async validateRolePOST(role) {

        try {
            const match = await regExp.nameMatch(role.role);
            if (!match.success) {
                throw new Error("Invalid role name");
            };

            const exist = await actionDB.many('roles', role);
            if (exist.success) {
                throw new Error("This role already exists");
            };

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }

    }

    async validateRoleUPDATE(role) {

        try {
            console.log(role);
            const match = await regExp.nameMatch(role.role);
            if (!match.success) {
                throw new Error("Invalid role name");
            };

            const compare = await actionDB.many('roles', { role: role.role });
            if (compare.success) {
                throw new Error("This role already exists");
            };

            const exist = await actionDB.unique('roles', { id: Number(role.id) });
            if (!exist.success) {
                throw new Error("This role does not exist");
            };

            return {
                success: true,
                role: role.role,
                exist: exist.result,
            };
        } catch (error) {
            return { success: false, message: error.message };
        }

    }

}