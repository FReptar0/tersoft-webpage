import nodemailer from "nodemailer";
import CustomResponse from "@/utils/CustomeResponse";
import axios from "axios";

export default async function mailsender(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json(
            new CustomResponse(405, "Method Not Allowed", "Method Not Allowed", {})
        );
    }

    const { uri, reCaptchaResponse } = req.body;

    if (!uri) {
        return res.status(400).json(
            new CustomResponse(400, "Faltan campos por llenar", "Faltan campos por llenar", {})
        );
    }

    if (!reCaptchaResponse) {
        return res.status(400).json(
            new CustomResponse(400, "Faltan campos por llenar", "Faltan campos por llenar", {})
        );
    }

    const verifyCaptcha = await axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaResponse}`);

    if (!verifyCaptcha.data.success) {
        return res.status(400).json(
            new CustomResponse(400, "Error en el captcha", "Error en el captcha", {})
        );
    }

    const HashTable = {
        "/home": verifyHome(req.body),
        "/contact": verifyContact(req.body),
        "/hero": verifyHero(req.body),
    }

    const verify = await HashTable[uri];
    return res.status(verify.status).json(verify);

}

export async function verifyHero(data) {
    const { name, phoneNumber, email } = data;
    if (!name || !phoneNumber || !email) {
        return new CustomResponse(400, "Faltan campos por llenar", "Faltan campos por llenar", {}
        );
    }

    const subject = "Solicitud de contacto desde la página de inicio - Hero";

    const text = `Se ha recibido una solicitud de contacto desde la página web desde la página de inicio, en el formulario de cotacto inicial. Los datos son los siguientes: \n

    Nombre: ${name}
    Teléfono: ${phoneNumber}
    Correo: ${email}`;

    const response = await sendMail({ subject, text });
    return response;
}

export async function verifyHome(data) {
    const { name, lastname, phoneNumber, email, company, option, webSite } = data;
    if (!name || !lastname || !phoneNumber || !email || !company) {
        return new CustomResponse(400, "Faltan campos por llenar", "Faltan campos por llenar", {})
    }

    const subject = "Solicitud de contacto desde la página de inicio";

    const text = `Se ha recibido una solicitud de contacto desde la página web desde la página de inicio, en el formulario de cotacto final. Los datos son los siguientes: \n

    Nombre: ${name} ${lastname}
    Teléfono: ${phoneNumber}
    Correo: ${email}
    Empresa: ${company}
    Opción: ${option}
    Sitio web: ${webSite}`;

    const response = await sendMail({ subject, text });

    return response;
}

export async function verifyContact(data) {
    const { email, fullName, phone, jobTitle, company, description, operations, software, userCount, modules, timeline, invoiceCount, improvements, budget, companyType, trainingMethod, evaluatingERPs } = data;

    if (!email || !fullName || !phone || !jobTitle || !company || !description || !operations || !software || !userCount || !modules || !timeline || !invoiceCount || !improvements || !budget || !companyType || !trainingMethod || !evaluatingERPs) {
        return new CustomResponse(400, "Faltan campos por llenar", "Faltan campos por llenar", {})
    }

    const subject = "Solicitud de contacto desde la página de contacto (Primer contacto)";

    const text = `Se ha recibido una solicitud de contacto desde la página web desde la página de contacto (Primer contacto). Los datos son los siguientes: \n

    Correo: ${email}
    Nombre completo: ${fullName}
    Teléfono: ${phone}
    Puesto: ${jobTitle}
    Empresa: ${company}
    Descripción: ${description}
    Operaciones: ${operations}
    Software: ${software}
    Cantidad de usuarios: ${userCount}
    Módulos: ${modules}
    Tiempo de implementación: ${timeline}
    Cantidad de facturas: ${invoiceCount}
    Mejoras: ${improvements}
    Presupuesto: ${budget}
    Tipo de empresa: ${companyType}
    Método de capacitación: ${trainingMethod}
    ERPs Evaluados: ${evaluatingERPs}`;

    const response = await sendMail({ subject, text });
    return response;
}

export async function sendMail(data) {
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
            subject: data.subject,
            text: data.text,
        };

        await transporter.sendMail(mailOptions);

        return new CustomResponse(200, "Correo electrónico enviado", {}, {});
    } catch (error) {
        return new CustomResponse(500, "Error al enviar el correo electrónico", error, {})
    }
}