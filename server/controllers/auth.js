import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth.js";
import LoginInfos from "../models/loginHistory.js";
import IP from 'ip'

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            "test",
            { expiresIn: "1h" }
        );
        res.status(200).json({ result: newUser, token });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const { browser, OS, deviceType } = req.body

    try {
        const existinguser = await users.findOne({ email });
        if (!existinguser) {
            return res.status(404).json({ message: "User don't Exist." });
        }
        const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
        if (!isPasswordCrt) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const ipAddress = IP.address();
        const token = jwt.sign(
            { email: existinguser.email, id: existinguser._id },
            "test",
            { expiresIn: "1h" }

        );
        const username = existinguser.name
        const LoginInfo = new LoginInfos({
            username, browser, OS, deviceType, ipAddress
        })
        LoginInfo.save();
        res.status(200).json({ result: existinguser, token });
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went worng...");
    }
}

export const loginHistory = async (req, res) => {
    try {
        const loginHistory = await LoginInfos.find({ username: req.body.username })
        res.send({
            loginHistory: loginHistory
        })
    } catch (err) {
        console.log(err)
        res.send("Error")
    }
}