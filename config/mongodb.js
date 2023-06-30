// utils/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.URI;
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
            db = client.db('tersoft');
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
