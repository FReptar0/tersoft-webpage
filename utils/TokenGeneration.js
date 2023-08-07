import Jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const token = Jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            role: user.isAdmin ? "admin" : user.isSuperAdmin ? "superadmin" : "user",
            company: user.company,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
    return token;
}