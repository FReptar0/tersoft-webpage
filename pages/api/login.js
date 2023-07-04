import { comparePassword } from "@/utils/PasswordUtils";
import { connectToDatabase, closeConnection } from "@/config/mongodb";

export default async function login(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 400, error: "Faltan campos por llenar" });
    }

    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ status: 400, error: "Correo electrónico inválido" });
    }

    const response = await findEmail(email);

    if (!response) {
        return res.status(400).json({ status: 400, error: "El correo electrónico no está registrado" });
    }

    const match = await comparePassword(password, response.password);

    if (!match) {
        return res.status(400).json({ status: 400, error: "Contraseña incorrecta" });
    }

    return res.status(200).json({ message: "Inicio de sesión exitoso", status: 200 });
}

const findEmail = async (email) => {
    try {
        const db = await connectToDatabase();
        const response = await db.collection("users").findOne({ email: email });
        await closeConnection();
        return response;
    } catch (error) {
        return error;
    }
};