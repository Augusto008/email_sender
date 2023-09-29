import RoleValidator from "../util/validation/validateRole";
import StandardDAO from "../dao/standardObj";

const roleValidator = new RoleValidator();
const actionDB = new StandardDAO();

export default {

    async createRole(req, res) {
        try {
            const { role } = req.body;
            const add = { role };

            const valid  = await roleValidator.validateRolePOST(add);
            if (!valid.success) {
                return res.status(400).json({ success: false, message: valid.message });
            };

            const result = await actionDB.create('roles', add);
            if (!result.success) {
                return res.status(400).json({ success: false, message: result.message });
            };
            return res.status(200).json({ success: true, result: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async allRoles(req, res) {
        try {
            const result = await actionDB.all('roles');
            if (!result.success) {
                return res.status(404).json({ success: false, message: "There are no registered roles" });
            }
            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async findRole(req, res) {
        try {
            const { id } = req.params;
            const result = await actionDB.unique('roles', { id: Number(id) });
            if (!result.success) {
                return res.status(404).json({ success: false, message: "Role not found" })
            }
            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async updateRole(req, res) {
        try {
            const { id } = req.params;
            const { role } = req.body;

            const toUpdate = await roleValidator.validateRoleUPDATE({ id: Number(id), role });
            if (!toUpdate.success) {
                return res.status(500).json({ success: false, message: toUpdate.message });
            }

            const result = await actionDB.update('roles', { id: Number(id) }, { role });
            if (!result.success) {
                return res.status(500).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async deleteRole(req, res) {
        try {
            const { id } = req.params;

            const result = await actionDB.delete('roles', { id: Number(id) });
            if (!result.success) {
                return res.status(500).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: "Role successfully deleted" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async destroyRole(req, res) {
        try {
            const { id } = req.params;

            const result = await actionDB.destroy('roles', { id: Number(id) });
            if (!result.success) {
                return res.status(500).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: "Role successfully destroyed" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

}