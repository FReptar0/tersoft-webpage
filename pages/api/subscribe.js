import { connectToDatabase, closeConnection } from "@/config/mongodb"
import { generateUUID } from "@/utils/UUIDGenerator";

export default async function subscriber(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email, type } = req.body;

    if (!email || !type) {
        return res.status(400).json({ error: "Faltan campos por llenar" });
    }

    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Correo electrónico inválido" });
    }

    const subscriber = await findSubscriber(email);

    if (subscriber) {
        return res.status(400).json({ error: "Ya existe una suscripción con este correo electrónico" });
    }

    if (type !== "waiting-list" && type !== "newsletter") {
        return res.status(400).json({ error: "Tipo de suscripción inválido" });
    }

    const date = new Date();
    const createdAt = date.toISOString().split("T")[0];


    const dataToInsert = {
        _id: generateUUID(),
        email,
        type,
        createdAt: createdAt
    }

    const response = await insertSubscriber(dataToInsert);
    const { error } = response;

    if (error) {
        return res.status(500).json({ error: "Ha ocurrido un error al insertar la suscripción" });
    }

    if (response.acknowledged) {
        return res.status(200).json({ status: 200, message: "Suscripción insertada correctamente" });
    } else {
        return res.status(500).json({ error: "Ha ocurrido un error al insertar la suscripción" });
    }

}

const insertSubscriber = async (data) => {
    try {
        const db = await connectToDatabase();
        const response = await db.collection("emails").insertOne(data);
        await closeConnection();
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const findSubscriber = async (email) => {
    try {
        const db = await connectToDatabase();
        const response = await db.collection("emails").findOne({ email });
        await closeConnection();
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}