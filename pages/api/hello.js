import { connectToDatabase, closeConnection } from "@/utils/mongodb"

export default async (req, res) => {
    // buscar todos los documentos de la coleccion administradores
    // y devolverlos en un arreglo
    const getAdministradores = async () => {
        const db = await connectToDatabase();
        const data = await db.collection("usuarios").find({}).toArray();
        await closeConnection();
        return data;
    };

    const data = await getAdministradores();

    res.status(200).json(data);
}