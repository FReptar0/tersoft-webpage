// utils/mongodb.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://fer:dvAG7i98hoHRmpL3@simapi.r0fu4dr.mongodb.net'; // Cambia esto con tu URL de conexión MongoDB
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let client;
let db;

async function connectToDatabase() {
    if (!db) {
        try {
            client = new MongoClient(uri, options);
            await client.connect();
            console.log('Conexión exitosa a la base de datos');
            db = client.db('simapi'); // Cambia 'simapi' por el nombre de tu base de datos
        } catch (error) {
            console.log('Error al conectar a la base de datos:', error);
        }
    }
    return db;
}

async function closeConnection() {
    if (client) {
        await client.close();
        console.log('Conexión cerrada');
    }
}

export { connectToDatabase, closeConnection };
