import { connectToDatabase, closeConnection } from "@/config/mongodb"
import { generateUUID } from "@/utils/UUIDGenerator";
import CustomResponse from "@/utils/CustomeResponse";

export default async function subscriber(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json(
            new CustomResponse(405, "Method Not Allowed", "Method Not Allowed", {})
        );
    }

    const { email, type } = req.body;

    if (!email || !type) {
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

    const subscriber = await findSubscriber(email, type);

    if (subscriber) {
        return res.status(400).json(
            new CustomResponse(400, "Ya existe un usuario con este correo electrónico", "Ya existe un usuario con este correo electrónico", {})
        );
    }

    if (type !== "waiting-list" && type !== "newsletter") {
        return res.status(400).json(
            new CustomResponse(400, "Tipo de suscripción inválido", { validTypes: ["waiting-list", "newsletter"] }, "Tipo de suscripción inválido")
        );
    }

    const date = new Date();
    const createdAt = date.toISOString().split("T")[0];


    const dataToInsert = {
        _id: generateUUID(),
        email,
        type,
        createdAt: createdAt
    }

    const response = await insertSubscriber(dataToInsert, type);
    const { error } = response;

    if (error) {
        return res.status(500).json(
            new CustomResponse(500, "Error al insertar la suscripción", "Error al insertar la suscripción", { error: error })
        );
    }

    if (response.acknowledged) {
        return res.status(201).json(
            new CustomResponse(201, "Suscripción insertada correctamente", { email, type, createdAt }, {})
        );
    } else {
        return res.status(500).json(
            new CustomResponse(500, "Error al guardar la suscripción", "Error al guardar la suscripción", {})
        );
    }

}

const insertSubscriber = async (data, type) => {
    try {
        const db = await connectToDatabase();
        const response = await db.collection(type + "-emails").insertOne(data);
        await closeConnection();
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const findSubscriber = async (email, type) => {
    try {
        const db = await connectToDatabase();
        const response = await db.collection(type + "-emails").findOne({ email });
        await closeConnection();
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}