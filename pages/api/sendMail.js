import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { nombre, apellido, telefono, correo, empresa, comentario, sitioWeb } = req.body;

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

        const result = await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Correo electrónico enviado" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al enviar el correo electrónico" });
    }
}
