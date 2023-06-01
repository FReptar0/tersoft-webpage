import { connectToDatabase, closeConnection } from "@/config/mongodb"

export default async (req, res) => {
    // buscar todos los documentos de la coleccion administradores
    // y devolverlos en un arreglo
    const getAdministradores = async () => {
        const db = await connectToDatabase();
        const data = await db.collection("historial").find({}).toArray();
        await closeConnection();
        return data;
    };

    const data = await getAdministradores();

    const returnData = {
        data: data,
        status: 200,
        message: "Datos obtenidos correctamente",
        longitud: data.length
    }

    res.status(200).json(returnData);
}