import RegExp from "../matchPattern/regExp";
import StandardDAO from "../../dao/standardObj";

const regExp = new RegExp();
const actionDB = new StandardDAO();

export default class CompanyValidator {

    async validateCompanyPOST(company) {

        try {
            const match = await regExp.nameMatch(company.name);
            if (!match.success) {
                throw new Error ("Invalid company name");
            };

            const exist = await actionDB.many('companies', company);
            if (exist.success) {
                throw new Error("This name is already in use!");
            };

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }

    }

}