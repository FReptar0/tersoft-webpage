import { hashPassword } from "@/utils/PasswordUtils";
import { connectToDatabase, closeConnection } from "@/config/mongodb";
import { generateUUID } from "@/utils/UUIDGenerator";
import CustomResponse from "@/utils/CustomeResponse";

export default async function register(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json(
            customResponseGenerator(405, "Method Not Allowed", "Method Not Allowed", {})
        );
    }

    const { name, lastname, email, company, password } = req.body;

    if (!name || !lastname || !email || !company || !password) {
        return res.status(400).json(
            customResponseGenerator(400, "Faltan campos por llenar", "Faltan campos por llenar", {})
        );
    }

    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json(
            customResponseGenerator(400, "Correo electrónico inválido", "Correo electrónico inválido", {})
        );
    }

    // Check if password is valid
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json(
            customResponseGenerator(400, "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número", "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número", {})
        );
    }

    const response = await findUser(email);

    if (response) {
        return res.status(400).json(
            customResponseGenerator(400, "Ya existe un usuario con este correo electrónico", "Ya existe un usuario con este correo electrónico", {})
        );
    }

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
        return res.status(500).json(
            customResponseGenerator(500, "Error al registrar al usuario", "Error al registrar al usuario", {})
        );
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
        await closeConnection();

        if (response.acknowledged) {
            return res.status(200).json(
                customResponseGenerator(201, "Usuario registrado correctamente", {}, {})
            );
        } else {
            return res.status(500).json(
                customResponseGenerator(500, "Error al registrar al usuario", "Error al registrar al usuario", {})
            );
        }
    } catch (error) {
        return res.status(500).json(
            new CustomResponse(500, "Error al registrar al usuario", error, {})
        );
    }
}

const findUser = async (email) => {
    try {
        const db = await connectToDatabase();
        const response = await db.collection("users").findOne({ email: email });
        await closeConnection();
        return response;
    } catch (error) {
        return error;
    }
}