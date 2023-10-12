import JobValidator from "../util/validation/validateJob";
import StandardDAO from "../dao/standardObj";

const jobValidator = new JobValidator();
const actionDB = new StandardDAO();

export default {

    async createJob(req, res) {
        try {
            const { domain, template } = req.params;
            const { status, problems, received_content } = req.body;
            const add = { status, problems, received_content, id_domains: Number(domain), id_templates: Number(template) };

            const valid = await jobValidator.validateJobPOST(add);
            if (!valid.success) {
                return res.status(400).json({ success: true, message: valid.message });
            }

            const result = await actionDB.create('email_jobs', add);
            if (!result.success) {
                return res.status(400).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async allJobs(req, res) {
        try {
            const result = await actionDB.all('email_jobs');
            if (!result.success) {
                return res.status(404).json({ success: false, message: result.message });
            }
            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async findJob(req, res) {
        try {
            const { id } = req.params;
            const result = await actionDB.unique('email_jobs', { id: Number(id) });
            if (!result.success) {
                return res.status(404).json({ success: false, message: result.message });
            }
            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    async updateJob(req, res) {
        try {
            const {id} = req.params;
            const { status, problems, received_content } = req.body;
            const toUpdate = { status, problems, received_content };

            const valid = await jobValidator.validateJobUPDATE({id: Number(id), toUpdate});
            if (!valid.success) {
                return res.status(400).json({ success: false, message: valid.message });
            }

            const result = await actionDB.update('email_jobs', {id: Number(id)}, toUpdate);
            if (!result.success) {
                return res.status(400).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async destroyJob(req, res) {
        try {
            const { id } = req.params;
            const result = await actionDB.destroy('email_jobs', { id: Number(id) });
            if (!result.success) {
                return res.status(400).json({ success: false, message: result.message });
            }
            return res.status(200).json({ success: true, message: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

}