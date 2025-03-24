import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => { // Accept userId as a parameter
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development"
    });
};

export default generateTokenAndSetCookie;
