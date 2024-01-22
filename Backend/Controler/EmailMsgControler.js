import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'test@gmail.com',
        pass: 'کد هش که جمیل خودش می سازه'
    }
})

export const sendEmailMsg = async (req, res) => {
    const {subject, massage, email} = res.body
    const user = `message from ${email}-subject${subject}`
    try {
        let details = {
            from: email,
            to: 'test2@gmail.com',
            subject: user,
            text: massage
        }
        await transporter.sendMail(details)
    } catch (err) {

    }
}