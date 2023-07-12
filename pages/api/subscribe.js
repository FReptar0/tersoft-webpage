import { connectToDatabase, closeConnection } from "@/config/mongodb"
import { generateUUID } from "@/utils/UUIDGenerator";
import CustomResponse from "@/utils/CustomeResponse";

export default async function subscriber(req, res) {
    const customResponse = new CustomResponse();
    if (req.method !== "POST") {
        customResponse.status = 405;
        customResponse.message = "Method Not Allowed";
        customResponse.errors = "Method Not Allowed";
        customResponse.data = {};
        return res.status(405).json(customResponse);
    }

    const { email, type } = req.body;

    if (!email || !type) {
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

    const subscriber = await findSubscriber(email, type);

    if (subscriber) {
        customResponse.status = 400;
        customResponse.message = "Ya existe un usuario con este correo electrónico";
        customResponse.errors = "Ya existe un usuario con este correo electrónico";
        customResponse.data = {};
        return res.status(400).json(customResponse);
    }

    if (type !== "waiting-list" && type !== "newsletter") {
        customResponse.status = 400;
        customResponse.message = "Tipo de suscripción inválido";
        customResponse.errors = "Tipo de suscripción inválido";
        customResponse.data = {
            validTypes: ["waiting-list", "newsletter"]
        };
        return res.status(400).json(customResponse);
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
        customResponse.status = 500;
        customResponse.message = "Error al insertar la suscripción";
        customResponse.errors = "Error al insertar la suscripción";
        customResponse.data = {
            error: error
        };
        return res.status(500).json(customResponse);
    }

    if (response.acknowledged) {
        customResponse.status = 200;
        customResponse.message = "Suscripción insertada correctamente";
        customResponse.errors = {};
        customResponse.data = {
            email,
            type,
            createdAt
        };
        return res.status(201).json(customResponse);
    } else {
        customResponse.status = 500;
        customResponse.message = "Error al guardar la suscripción";
        customResponse.errors = "Error al guardar la suscripción";
        customResponse.data = {};
        return res.status(500).json(customResponse);
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