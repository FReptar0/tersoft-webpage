import { hashPassword } from "@/utils/PasswordUtils";
import { connectToDatabase, closeConnection } from "@/config/mongodb";
import { generateUUID } from "@/utils/UUIDGenerator";
import CustomResponse from "@/utils/CustomeResponse";

export default async function register(req, res) {
    const customResponse = new CustomResponse();
    if (req.method !== "POST") {
        customResponse.status = 405;
        customResponse.message = "Method Not Allowed";
        customResponse.errors = "Method Not Allowed";
        customResponse.data = {};
        return res.status(405).json(customResponse);
    }

    const { name, lastname, email, company, password } = req.body;

    if (!name || !lastname || !email || !company || !password) {
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

    // Check if password is valid
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        customResponse.status = 400;
        customResponse.message = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número";
        customResponse.errors = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número";
        customResponse.data = {};
        return res.status(400).json(customResponse);
    }

    const response = await findUser(email);

    if (response) {
        customResponse.status = 400;
        customResponse.message = "Ya existe un usuario con este correo electrónico";
        customResponse.errors = "Ya existe un usuario con este correo electrónico";
        customResponse.data = {};
        return res.status(400).json(customResponse);
    }

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
        customResponse.status = 500;
        customResponse.message = "Error al registrar al usuario";
        customResponse.errors = "Error al registrar al usuario";
        customResponse.data = {};
        return res.status(500).json(customResponse);
    }

    const date = new Date().toLocaleDateString("es-MX", { timeZone: "America/Mexico_City", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });

    const user = {
        '_id': generateUUID(),
        'name': name,
        'lastname': lastname,
        'email': email,
        'company': company,
        'password': hashedPassword,
        'isApproved': false,
        'isAdmin': false,
        'isSuperAdmin': false,
        'isBlocked': false,
        'createdAt': date,
        'updatedAt': date
    }

    try {
        const db = await connectToDatabase();
        const response = await db.collection("users").insertOne(user);

        if (response.acknowledged) {
            customResponse.status = 200;
            customResponse.message = "Usuario registrado correctamente";
            customResponse.errors = {};
            customResponse.data = {};
            return res.status(200).json(customResponse);
        } else {
            customResponse.status = 500;
            customResponse.message = "Error al registrar al usuario";
            customResponse.errors = "Error al registrar al usuario";
            customResponse.data = {};
            return res.status(500).json(customResponse);
        }
    } catch (error) {
        customResponse.status = 500;
        customResponse.message = "Error al registrar al usuario";
        customResponse.errors = "Error al registrar al usuario";
        customResponse.data = {};
        return res.status(500).json(customResponse);
    }
}

const findUser = async (email) => {
    try {
        const db = await connectToDatabase();
        const response = await db.collection("users").findOne({ email: email });
        return response;
    } catch (error) {
        return error;
    }
}