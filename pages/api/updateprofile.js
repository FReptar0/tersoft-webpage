import { comparePassword } from "@/utils/PasswordUtils";
import { connectToDatabase, closeConnection } from "@/config/mongodb";
import { hashPassword } from "@/utils/PasswordUtils";
import CustomResponse from "@/utils/CustomeResponse";
import Jwt from "jsonwebtoken";

export default async function updateprofile(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json(
            new CustomResponse(405, "Method Not Allowed", "Method Not Allowed", {})
        );
    }

    // Bearer token
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(400).json(
            new CustomResponse(400, "Token inválido", "Token inválido", {})
        );
    }

    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
        return res.status(400).json(
            new CustomResponse(400, "Token inválido", "Token inválido", {})
        );
    }

    const { name, lastname, email, company, password, oldPassword } = req.body;

    // Check if the decoded email is the same as the email in the body
    if (decodedToken.email !== email) {
        return res.status(400).json(
            new CustomResponse(400, "Token inválido", "Token inválido", {})
        );
    }

    if (!name || !lastname || !email || !company) {
        return res.status(400).json(
            new CustomResponse(400, "Faltan campos por llenar", "Faltan campos por llenar", {})
        );
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json(
            new CustomResponse(400, "Correo electrónico inválido", "Correo electrónico inválido", {})
        );
    }

    const response = await findById(decodedToken.id)

    if (!response) {
        return res.status(400).json(
            new CustomResponse(400, "Usuario no encontrado", "Usuario no encontrado", {})
        );
    }

    if (!response.isApproved) {
        return res.status(400).json(
            new CustomResponse(400, "Usuario no aprobado", "Usuario no aprobado", {})
        );
    }

    if (response.isBlocked) {
        return res.status(400).json(
            new CustomResponse(400, "Tu usuario ha sido bloqueado, contacta al administrador", "Usuario bloqueado", {})
        );
    }

    if (password && oldPassword) {
        const match = await comparePassword(oldPassword, response.password);

        if (!match) {
            return res.status(400).json(
                new CustomResponse(400, "Contraseña incorrecta", "Contraseña incorrecta", {})
            );
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json(
                new CustomResponse(400, "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número", "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número", {})
            );
        }

        const hashedPassword = await hashPassword(password);

        const db = await connectToDatabase();
        const response = await db.collection("users").updateOne({ email: email }, { $set: { name: name, lastname: lastname, company: company, password: hashedPassword } });
        await closeConnection();

        if (response.acknowledged) {
            return res.status(200).json(
                new CustomResponse(200, "Usuario actualizado correctamente", {}, {})
            );
        } else {
            return res.status(400).json(
                new CustomResponse(400, "Error al actualizar el usuario", "Error al actualizar el usuario", {})
            );
        }
    } else {
        const db = await connectToDatabase();
        const response = await db.collection("users").updateOne({ email: email }, { $set: { name: name, lastname: lastname, company: company } });
        await closeConnection();

        if (response.acknowledged) {

            return res.status(200).json(
                new CustomResponse(200, "Usuario actualizado correctamente", {}, {})
            );
        } else {
            return res.status(400).json(
                new CustomResponse(400, "Error al actualizar el usuario", "Error al actualizar el usuario", {})
            );
        }
    }
}

const findById = async (id) => {
    try {
        const db = await connectToDatabase();
        const response = await db.collection("users").findOne({ _id: id });
        await closeConnection();
        return response;
    } catch (error) {
        return error;
    }
};