import nodemailer from "nodemailer";
import CustomResponse from "@/utils/CustomeResponse";

export default async function mailsender(req, res) {
    const customResponse = new CustomResponse();
    if (req.method !== "POST") {
        customResponse.status = 405;
        customResponse.message = "Method Not Allowed";
        customResponse.errors = "Method Not Allowed";
        customResponse.data = {};
        return res.status(405).json(customResponse);
    }

    const { nombre, apellido, telefono, correo, empresa, comentario, sitioWeb } = req.body;
    console.log(req.body);
    if (!nombre || !apellido || !telefono || !correo || !empresa) {
        customResponse.status = 400;
        customResponse.message = "Faltan campos por llenar";
        customResponse.errors = "Faltan campos por llenar";
        customResponse.data = {};
        return res.status(400).json(customResponse);
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
Comentario: ${comentario}
Sitio web: ${sitioWeb}`
        };

        await transporter.sendMail(mailOptions);

        customResponse.status = 200;
        customResponse.message = "Correo electrónico enviado";
        customResponse.errors = null;
        customResponse.data = {};
        return res.status(200).json(customResponse);
    } catch (error) {
        customResponse.status = 500;
        customResponse.message = "Error al enviar el correo electrónico";
        customResponse.errors = error;
        customResponse.data = {};
        return res.status(500).json(customResponse);
    }
}
