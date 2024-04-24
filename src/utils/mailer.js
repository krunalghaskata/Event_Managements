const nodemailer = require('nodemailer')


const sendMail = async (email, name, res) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Nodemailer Test',
            text: `hello ${name}`,
        };

        const data = await transporter.sendMail(mailOptions);
        return res.json({ data })
    } catch (error) {
        return error;
    }
}


module.exports = sendMail