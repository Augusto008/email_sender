import RegExp from "../matchPattern/regExp";
import StandardDAO from "../../dao/standardObj";

const regExp = new RegExp();
const actionDB = new StandardDAO();

export default class CompanyValidator {

    async validateCompanyPOST(company) {

        try {
            let {name} = company;
            const match = await regExp.match({name});
            if (!match.success) {
                throw new Error(`Invalid company ${match.message}`);
            };

            const exist = await actionDB.many('companies', {name});
            if (exist.success) {
                throw new Error("This name is already in use!");
            };

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }

    }

    async validateCompanyUPDATE(company) {

        try {
            var {name} = company;
            const match = await regExp.match({name});
            if (!match.success) {
                throw new Error(`Invalid company ${match.message}`);
            };

            const compare = await actionDB.many('companies', {name});
            if (compare.success) {
                throw new Error("This company name is already in use");
            };

            const exist = await actionDB.unique('companies', { id: Number(company.id) });
            if (!exist.success) {
                throw new Error("This company does not exist");
            };

            return {
                success: true,
                name: company.name,
                company: exist.result,
            };
        } catch (error) {
            return { success: false, message: error.message };
        }

    }

}