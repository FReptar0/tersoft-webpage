import { comparePassword } from "@/utils/PasswordUtils";
import { connectToDatabase, closeConnection } from "@/config/mongodb";
import Jwt from "jsonwebtoken";
import CustomResponse from "@/utils/CustomeResponse";

export default async function login(req, res) {
    const customResponse = new CustomResponse();
    if (req.method !== "POST") {
        customResponse.status = 405;
        customResponse.message = "Method Not Allowed";
        customResponse.errors = "Method Not Allowed";
        customResponse.data = {};
        return res.status(405).json(customResponse);
    }

    const { email, password } = req.body;

    if (!email || !password) {
        customResponse.status = 400;
        customResponse.message = "Faltan campos por llenar";
        customResponse.errors = "Faltan campos por llenar";
        customResponse.data = {};
        return res.status(400).json(customResponse);
    }

    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        customResponse.status = 400;
        customResponse.message = "Correo electrónico inválido";
        customResponse.errors = "Correo electrónico inválido";
        customResponse.data = {};
        return res.status(400).json(customResponse);
    }

    const response = await findEmail(email);

    // verificar si mando error

    if (response.error) {
        customResponse.status = 500;
        customResponse.message = "Error al iniciar sesión";
        customResponse.errors = "Error al iniciar sesión";
        customResponse.data = {};
        return res.status(500).json(customResponse);
    }

    if (!response) {
        customResponse.status = 400;
        customResponse.message = "No existe un usuario con este correo electrónico";
        customResponse.errors = "No existe un usuario con este correo electrónico";
        customResponse.data = {};
        return res.status(400).json(customResponse);
    }

    const match = await comparePassword(password, response.password);

    if (!match) {
        customResponse.status = 400;
        customResponse.message = "Contraseña incorrecta";
        customResponse.errors = "Contraseña incorrecta";
        customResponse.data = {};
        return res.status(400).json(customResponse);
    }

    const token = generateToken(response);

    customResponse.status = 200;
    customResponse.message = "Inicio de sesión exitoso";
    customResponse.errors = {};
    customResponse.data = { token: token };
    return res.status(200).json(customResponse);
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

export const generateToken = (user) => {
    const token = Jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.isAdmin ? "admin" : user.isSuperAdmin ? "superadmin" : "user",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
    return token;
}