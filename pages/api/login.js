import { comparePassword } from "@/utils/PasswordUtils";
import { connectToDatabase, closeConnection } from "@/config/mongodb";
import CustomResponse from "@/utils/CustomeResponse";
import { generateToken } from "@/utils/TokenGeneration";

export default async function login(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json(
            new CustomResponse(405, "Method Not Allowed", "Method Not Allowed", {})
        );
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json(
            new CustomResponse(400, "Faltan campos por llenar", "Faltan campos por llenar", {})
        );
    }

    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json(
            new CustomResponse(400, "Correo electrónico inválido", "Correo electrónico inválido", {})
        );
    }

    const response = await findEmail(email);

    if (!response) {
        return res.status(400).json(
            new CustomResponse(400, "No existe un usuario con este correo electrónico", "No existe un usuario con este correo electrónico", {})
        );
    }

    if (!response.isApproved) {
        return res.status(400).json(
            new CustomResponse(400, "Usuario no aprobado", "Usuario no aprobado", {}, {})
        );
    }

    if (response.isBlocked) {
        return res.status(400).json(
            new CustomResponse(400, "Tu usuario ha sido bloqueado, contacta al administrador", "Usuario bloqueado", {})
        );
    }

    const match = await comparePassword(password, response.password);

    if (!match) {
        return res.status(400).json(
            new CustomResponse(400, "Contraseña incorrecta", {}, {})
        );
    }

    const token = generateToken(response);

    return res.status(200).json(
        new CustomResponse(200, "Inicio de sesión exitoso", { token: token }, {})
    );
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