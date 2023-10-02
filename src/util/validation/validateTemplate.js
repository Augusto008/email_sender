import RegExp from "../matchPattern/regExp";
import StandardDAO from "../../dao/standardObj";

const regExp = new RegExp();
const actionDB = new StandardDAO();

export default class TemplateValidator {

    async validateTemplatePOST(template) {
        try {
            const match = await regExp.match(template);
            if(!match.success) {
                return { success: false, message: match.message };
            }
            
            const exist = await actionDB.many('templates', { title: template.title });
            if(!exist.success) {
                return { success: false, message: "This template already exists" };
            }

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async validateTemplateUPDATE(template) {
        try {
            const {id} = template;
            const actualTemplate = await actionDB.unique('templates', {id: Number(id)});
            if (!actualTemplate) {
                return { success: false, message: "This template does not exist" };
            }

            const match = await regExp.match(template);
            if(!match.success) {
                return { success: false, message: match.message };
            }

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

}