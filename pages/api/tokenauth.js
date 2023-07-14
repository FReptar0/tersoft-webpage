import Jwt from "jsonwebtoken";
import CustomResponse from "@/utils/CustomeResponse";

export default async function tokenauth(req, res) {
    const customResponse = new CustomResponse();
    if (req.method !== "POST") {
        customResponse.status = 405;
        customResponse.message = "Method Not Allowed";
        customResponse.errors = "Method Not Allowed";
        customResponse.data = {};
        return res.status(405).json(customResponse);
    }

    const { token } = req.body;

    if (!token) {
        customResponse.status = 400;
        customResponse.message = "Faltan campos por llenar";
        customResponse.errors = "Faltan campos por llenar";
        customResponse.data = {};
        return res.status(400).json(customResponse);
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        customResponse.status = 200;
        customResponse.message = "Token válido";
        customResponse.errors = {};
        customResponse.data = { decoded: decoded };
        return res.status(200).json(customResponse);
    } catch (error) {
        customResponse.status = 400;
        customResponse.message = "Token inválido";
        customResponse.errors = "Token inválido";
        customResponse.data = {};
        return res.status(400).json(customResponse);
    }
}