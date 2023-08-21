import nodemailer from "nodemailer";
import CustomResponse from "@/utils/CustomeResponse";

export default async function mailsender(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json(
            new CustomResponse(405, "Method Not Allowed", "Method Not Allowed", {})
        );
    }

    const { nombre, apellido, telefono, correo, empresa, opcion, sitioWeb } = req.body;

    if (!nombre || !apellido || !telefono || !correo || !empresa) {
        return res.status(400).json(
            new CustomResponse(400, "Faltan campos por llenar", "Faltan campos por llenar", {})
        );
    }

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: process.env.CORREO_ENVIO,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.SECRET_CLIENT,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN,
            },
        });

        const mailOptions = {
            from: process.env.CORREO_ENVIO,
            to: process.env.CORREO_AVISOS,
            subject: "Nuevo mensaje para contactar",
            text: `Se ha recibido un nuevo mensaje de un posible cliente desde el formulario de contacto de la página web. A continuación se muestran los datos del cliente:

Nombre: ${nombre} ${apellido}
Teléfono: ${telefono}
Correo: ${correo}
Empresa: ${empresa}
Opción: ${opcion}
Sitio web: ${sitioWeb}`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json(
            new CustomResponse(200, "Correo electrónico enviado", {}, {})
        );
    } catch (error) {
        return res.status(500).json(
            new CustomResponse(500, "Error al enviar el correo electrónico", error, {})
        );
    }
}