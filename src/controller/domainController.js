import DomainValidator from "../util/validation/validateDomain";
import StandardDAO from "../dao/standardObj";

const domainValidator = new DomainValidator();
const actionDB = new StandardDAO();

export default {

    async createDomain (req, res) {
        try {
            const id_companies = Number(req.params.company);
            const {name, logo, url, sender, replier, contact, footer} = req.body;
            const add = {id_companies, name, logo, url, sender, replier, contact, footer};
            
            const valid = await domainValidator.validateDomainPOST(req.body);
            if (!valid.success) {
                return res.status(403).json({ success: false, message: valid.message });
            }

            const result = await actionDB.create('domains', add);
            if (!result.success) {
                return res.status(403).json({ success: false, message: result.message });
            }

            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },
    
    async allDomains (req, res) {
        try {
            const result = await actionDB.all('domains');
            if(!result.success) {
                return res.status(404).json({ success: false, message: "No registered domains" });
            }
            
            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async findDomain (req, res) {
        try {
            const {id} = req.params;
            const result = await actionDB.unique('domains', {id: Number(id)})
            
            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async updateDomain (req, res) {
        try {
            const {id} = req.params;
            
            const valid = await domainValidator.validateDomainUPDATE(req.body);
            if(!valid.success) {
                return res.status(400).json({ success: false, message: valid.message });
            }

            const result = await actionDB.update('domains', {id: Number(id)}, req.body);
            if(!result.success) {
                return res.status(500).json({ success: false, message: result.message });
            }
            
            return res.status(200).json({ success: true, message: result.result });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async deleteDomain (req, res) {
        try {
            const {id} = req.params;

            const exist = await actionDB.unique('domains', {id: Number(id)});
            if(!exist.success) {
                return res.status(400).json({ success: false, message: "Incorrect parameters" });
            }

            const result = await actionDB.delete('domains', {id: Number(id)});
            if(!result.success) {
                return res.status(500).json({ success: false, message: result.message });
            }
            
            return res.status(200).json({ success: true, message: "Domain successfully deleted" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    async destroyDomain (req, res) {
        try {
            const {id} = req.params;

            const exist = await actionDB.unique('domains', {id: Number(id)});
            if(!exist.success) {
                return res.status(400).json({ success: false, message: "Incorrect parameters" });
            }

            const result = await actionDB.destroy('domains', {id: Number(id)});
            if(!result.success) {
                return res.status(500).json({ success: false, message: result.message });
            }
            
            return res.status(200).json({ success: true, message: "Domain successfully destroyed" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

}