const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require('../prisma');

const signUpController = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        
        if (!email || !password || !name) {
            return res
                .status(400)
                .json({ error: "One or more fields are empty" });
        }
        const alreadyUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (alreadyUser) {
            return res.status(409).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.User.create({
            data: { name, email, hash: hashedPassword },
        });
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};



module.exports = {
    signUpController,
};
