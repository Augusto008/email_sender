import TemplateValidator from "../util/validation/validateTemplate";
import StandardDAO from "../dao/standardObj";

const templateValidator = new TemplateValidator();
const actionDB = new StandardDAO();

export default {

    async createTemplate(req, res) {
        try {
            const { title, subject, receiver, description, body, requirements } = req.body;
            const add = { title, subject, receiver, description, body, requirements };

            const valid = await templateValidator.validateTemplatePOST(add);
            if (!valid.success) {
                return res.status(403).json({ success: false, message: valid.message });
            }

            const result = await actionDB.create('templates', add);
            if (!result.success) {
                return res.status(403).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async allTemplates(req, res) {
        try {
            const result = await actionDB.all('templates');
            if (!result.success) {
                return res.status(404).json({ success: false, message: "There are no registered templates" });
            }
            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async findTemplate(req, res) {
        try {
            const { id } = req.params;
            const result = await actionDB.unique('templates', { id: Number(id) });
            if (!result.success) {
                return res.status(404).json({ success: false, message: result.message });
            }
            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async updateTemplate(req, res) {
        try {
            const { id } = req.params;
            const { title, subject, receiver, description, body, requirements } = req.body;
            const toUpdate = { title, subject, receiver, description, body, requirements };

            const valid = await templateValidator.validateTemplateUPDATE(id, toUpdate);
            if (!valid.success) {
                return res.status(403).json({ success: false, message: valid.message });
            }

            const result = await actionDB.update('templates', { id: Number(id) }, toUpdate);
            if (!result.success) {
                return res.status(403).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async deleteTemplate(req, res) {
        try {
            const { id } = req.params;
            const relations = await actionDB.delete('templates', { id: Number(id) });
            if (!relations.success) {
                return res.status(404).json({ success: false, message: result.message });
            }

            const result = await actionDB.delete('templates', { id: Number(id) });
            if (!result.success) {
                return res.status(404).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async destroyTemplate(req, res) {
        try {
            const { id } = req.params;
            const result = await actionDB.destroy('templates', { id: Number(id) });
            if (!result.success) {
                return res.status(404).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

}