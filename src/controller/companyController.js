import CompanyValidator from "../util/validation/validateCompany";
import StandardDAO from "../dao/standardObj";

const companyValidator = new CompanyValidator();
const actionDB = new StandardDAO();

export default {

    async createCompany(req, res) {
        try {
            const { name } = req.body;
            const add = { name };

            const company = await companyValidator.validateCompanyPOST(add);
            if(!company.success) {
                return res.status(400).json({ success:false, message: company.message });
            };

            const result = await actionDB.create('companies', add);

            if (!result.success) {
                return res.status(400).json({ success: false, message: result.message });
            };
            return res.status(200).json({ success: true, result: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async allCompanies(req, res) {
        try {
            const result = await actionDB.all('companies');
            if (!result.success) {
                return res.status(404).json({ success: false, message: result.message });
            }
            return res.status(200).json({ success: true, message: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}