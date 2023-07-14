import Jwt from "jsonwebtoken";

export const generateToken = (user) => {
    console.log("process ", process);
    const token = Jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: `${user.name} ${user.lastName}`,
            role: user.isAdmin ? "admin" : user.isSuperAdmin ? "superadmin" : "user",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
    return token;
}