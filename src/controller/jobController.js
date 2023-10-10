import JobValidator from "../util/validation/validateJobs";
import StandardDAO from "../dao/standardObj";

const jobValidator = new JobValidator();
const actionDB = new StandardDAO();

export default {

    async createJob(req, res) {
        try {
            const {domain, template} = req.params;
            const {status, problems, received_content} = req.body;
            const add = {status, problems, received_content, id_domains: Number(domain), id_templates: Number(template)};

            const valid = await jobValidator.validateJobPOST(add);
            if(!valid.success) {
                return res.status(400).json({success: true, message: valid.message});
            }

            const result = await actionDB.create('email_jobs', add);
            if(!result.success) {
                return res.status(400).json({success: false, message: result.message});
            }

            return res.status(200).json({success: true, message: result.result});
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

}