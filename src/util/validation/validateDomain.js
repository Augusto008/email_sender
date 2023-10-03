import RegExp from "../matchPattern/regExp";
import StandardDAO from "../../dao/standardObj";


const regExp = new RegExp();
const actionDB = new StandardDAO();


export default class DomainValidator {

    async validateDomainPOST(domain) {
        try {
            const match = await regExp.match(domain);
            if (!match.success) {
                return { success: false, message: match.message };
            }

            const compare = { OR: [{ name: domain.name}, {url: domain.url }] };

            const exist = await actionDB.many('domains', compare);
            if (exist.result.length > 0) {
                return { success: false, message: exist.message };
            }

            return { success: true }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async validateDomainUPDATE(domain) {
        try {
            const match = await regExp.match(domain);
            if (!match.success) {
                return { success: false, message: match.message };
            }

            const compare = { OR: [{ name: domain.name}, {url: domain.url }] };

            const exist = await actionDB.many('domains', compare);
            if (exist.result.length > 0) {
                return { success: false, message: exist.message };
            }

            return { success: true }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

};