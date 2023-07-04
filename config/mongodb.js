import { MongoClient } from 'mongodb';

const uri = process.env.URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // Establece el tamaño máximo del pool de conexiones
};

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return cachedDb;
    }

    try {
        const client = await MongoClient.connect(uri, options);
        const db = client.db('tersoft');
        cachedClient = client;
        cachedDb = db;
        console.log('Conexión exitosa a la base de datos');
        return db;
    } catch (error) {
        console.log('Error al conectar a la base de datos:', error);
        throw error;
    }
}

export async function closeConnection() {
    if (cachedClient) {
        await cachedClient.close();
        cachedClient = null;
        cachedDb = null;
        console.log('Conexión cerrada');
    }
}
