import RegExp from "../matchPattern/regExp";
import StandardDAO from "../../dao/standardObj";

const regExp = new RegExp();
const actionDB = new StandardDAO();

export default class RoleValidator {

    async validateRolePOST(role) {

        try {
            const { name } = role;
            const match = await regExp.match({ name });
            if (!match.success) {
                throw new Error(`Invalid role ${match.message}`);
            };

            const exist = await actionDB.many('roles', { name } );
            if (exist.result.length > 0) {
                throw new Error("This role already exists");
            };

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }

    }

    async validateRoleUPDATE(role) {

        try {
            var { name } = role;
            const match = await regExp.match({ name });
            if (!match.success) {
                throw new Error(`Invalid role ${match.message}`);
            };

            const compare = await actionDB.many('roles', { name } );
            if (compare.result.length > 0) {
                throw new Error("This role already exists");
            };

            const exist = await actionDB.unique('roles', { id: Number(role.id) });
            if (!exist.success) {
                throw new Error("This role does not exist");
            };

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }

    }

}