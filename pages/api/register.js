import { hashPassword } from "@/utils/PasswordUtils";
import { connectToDatabase, closeConnection } from "@/config/mongodb";
import { generateUUID } from "@/utils/UUIDGenerator";

export default async function register(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }

    const { name, lastname, email, company, password } = req.body;

    if (!name || !lastname || !email || !company || !password) {
        return res.status(400).json({ status: 400, error: "Faltan campos por llenar" });
    }

    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ status: 400, error: "Correo electrónico inválido" });
    }

    // Check if password is valid
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ status: 400, error: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número" });
    }

    const response = await findUser(email);

    if (response) {
        return res.status(400).json({ status: 400, error: "Ya existe un usuario con este correo electrónico" });
    }

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
        return res.status(500).json({ status: 500, error: "Error al registrar al usuario" });
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
            return res.status(200).json({ status: 200, message: "Usuario registrado correctamente" });
        } else {
            return res.status(500).json({ status: 500, error: "Error al registrar al usuario" });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, error: "Error al registrar al usuario" });
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