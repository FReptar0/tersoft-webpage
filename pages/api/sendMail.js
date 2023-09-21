import nodemailer from "nodemailer";
import CustomResponse from "@/utils/CustomeResponse";
import axios from "axios";

export default async function mailsender(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json(
            new CustomResponse(405, "Method Not Allowed", "Method Not Allowed", {})
        );
    }

    const { uri, reCaptchaResponse, reCaptchaResponsev3 } = req.body;

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

    if (!reCaptchaResponsev3) {
        return res.status(400).json(
            new CustomResponse(400, "Faltan campos por llenar", "Faltan campos por llenar", {})
        );
    }

    const verifyCaptchaV3 = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY_V3}&response=${reCaptchaResponsev3}`)
        .catch(() => {
            return res.status(400).json(
                new CustomResponse(400, "Error en el captcha", "Error en el captcha", {})
            );
        });

    if (!verifyCaptchaV3.data.success) {
        return res.status(400).json(
            new CustomResponse(400, "Error en el captcha", "Error en el captcha", {})
        );
    } else if (verifyCaptchaV3.data.score < 0.7) {
        return res.status(400).json(
            new CustomResponse(400, "Error en el captcha - Score", "Error en el captcha - Score", {})
        );
    } else if (verifyCaptchaV3.data.action !== "submit") {
        return res.status(400).json(
            new CustomResponse(400, "Error en el captcha - Action", "Error en el captcha - Action", {})
        );
    } else if (verifyCaptchaV3.data.challenge_ts < (Date.now() / 1000) - 120) {
        return res.status(400).json(
            new CustomResponse(400, "Error en el captcha - Challenge", "Error en el captcha - Challenge", {})
        );
    }

    const verifyCaptcha = await axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaResponse}`)
        .catch(() => {
            return res.status(400).json(
                new CustomResponse(400, "Error en el captcha", "Error en el captcha", {})
            );
        })

    if (!verifyCaptcha.data.success) {
        return res.status(400).json(
            new CustomResponse(400, "Error en el captcha", "Error en el captcha", {})
        );
    }

    const HashTable = {
        "/home": verifyHome(req.body),
        "/contact": verifyContact(req.body),
    }

    const verify = await HashTable[uri];
    return res.status(verify.status).json(verify);

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
    const { email, fullName, jobTitle, company, description, operations, software, userCount, modules, timeline, invoiceCount, improvements, budget, companyType, trainingMethod, evaluatingERPs, phoneNumber } = data;

    if (!email || !fullName || !jobTitle || !company || !description || !operations || !software || !userCount || !timeline || !invoiceCount || !improvements || !budget || !companyType || !trainingMethod || !phoneNumber) {
        return new CustomResponse(400, "Faltan campos por llenar", "Faltan campos por llenar", {})
    }

    const subject = "Solicitud de contacto desde la página de contacto - Primer Contacto";

    const text = `Se ha recibido una solicitud de contacto desde la página web desde la página de contacto, en el formulario de cotacto inicial. Los datos son los siguientes: \n

    Nombre: ${fullName}
    Teléfono: ${phoneNumber}
    Correo: ${email}
    Puesto: ${jobTitle}
    Empresa: ${company}
    Descripción: ${description}
    Operaciones: ${operations}
    Software: ${software}
    Cantidad de usuarios: ${userCount}
    Modulos: ${modules}
    Tiempo de implementación: ${timeline}
    Cantidad de facturas: ${invoiceCount}
    Mejoras: ${improvements}
    Presupuesto: ${budget}
    Tipo de empresa: ${companyType}
    Método de capacitación: ${trainingMethod}
    Evaluando ERPs: ${evaluatingERPs}`;

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