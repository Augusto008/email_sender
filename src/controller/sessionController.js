import StandardDAO from "../dao/standardObj";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const actionDB = new StandardDAO();

export default {

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await actionDB.unique('users', { email });
            if (user.result.length === 0) {
                return res.status(500).json({ success: false, message: "Email ou senha incorreto." });
            }

            const pass = user.result.password;

            if (!(await bcrypt.compare(password, pass))) {
                return res.status(500).json({ success: false, message: "Email ou senha incorreto." });
            }

            const { id } = user.result;

            return res.status(200).json({
                user: { id, email }, token: jwt.sign({ id }, process.env.API_SECRET)
            })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

}