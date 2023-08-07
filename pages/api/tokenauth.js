import Jwt from "jsonwebtoken";
import CustomResponse from "@/utils/CustomeResponse";

export default async function tokenauth(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json(
            new CustomResponse(405, "Method Not Allowed", "Method Not Allowed", {})
        );
    }

    const { token } = req.body;

    if (!token) {
        return res.status(400).json(
            new CustomResponse(400, "Faltan campos por llenar", "Faltan campos por llenar", {})
        );
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json(
            new CustomResponse(200, "Token válido", { decoded: decoded }, {})
        );
    } catch (error) {
        return res.status(400).json(
            new CustomResponse(400, "Token inválido", "Token inválido", {})
        );
    }
}