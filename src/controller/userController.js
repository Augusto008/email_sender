import UserValidator from "../util/validation/validateUser";
import StandardDAO from "../dao/standardObj";
import UserDAO from "../dao/userObj";
import bcrypt from "bcrypt";

const userValidator = new UserValidator();
const actionDB = new StandardDAO();
const actionUser = new UserDAO();

export default {

    async createUser(req, res) {
        try {
            const { company, role } = req.params;
            const { name, email, password } = req.body;
            const add = { id_companies: Number(company), id_roles: Number(role), name, email, password };

            const valid = await userValidator.validateUserPOST(add);
            if (!valid.success) {
                return res.status(500).json({ success: false, message: valid.message });
            };

            add.password = await bcrypt.hash(password, 8);
            const result = await actionUser.create(add);
            if (!result.success) {
                return res.status(500).json({ success: false, message: error.message });
            };

            return res.status(200).json({ success: true, message: result.message });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async allUsers(req, res) {
        try {
            const result = await actionDB.all('users');
            if (!result.success) {
                return res.status(404).json({ success: false, message: result });
            };
            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async findUser(req, res) {
        try {
            const { id } = req.params;
            const result = await actionDB.unique('users', { id: Number(id) });
            if (!result.success) {
                return res.status(404).json({ success: false, message: result.message });
            }
            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { company, role, name, email, password } = req.body;
            const toUpdate = { id_companies: company, id_roles: role, name, email, password };

            const valid = await userValidator.validateUserUPDATE({ toUpdate });
            if (!valid.success) {
                return { success: false, message: valid.message }
            }

            if (toUpdate.email) {
                const emailExist = await actionDB.many({ email });
                if (emailExist.success) {
                    return { success: false, message: "This email is already in use" };
                }
            }

            if (toUpdate.password) {
                password = await bcrypt.hash(password, 8);
            }

            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const result = await actionDB.delete('users', { id: Number(id) });
            if (!result.success) {
                return res.status(500).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: "User successfully deleted" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async destroyUser(req, res) {
        try {
            const { id } = req.params;

            const roles = await actionDB.many('users', {id: Number(id)});
            console.log(roles);

            const relations = await actionDB.destroy('users_companies', { id_users: Number(id) });
            if (!relations.success) {
                return res.status(500).json({ success: false, message: relations.message });
            }

            const result = await actionDB.destroy('users', { id: Number(id) });
            if (!result.success) {
                return res.status(500).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: "User succesfully destroyed" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }


}