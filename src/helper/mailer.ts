import nodemailer from 'nodemailer';
import User from '@/models/userModels';
import bcryptjs from 'bcryptjs';

export const sendMail = async ({ email, emailType, userId }:any) => {
    try {
        if (!['verify', 'forgot'].includes(emailType)) {
            throw new Error('Invalid email type');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        const tokenField = emailType === 'verify' ? 'verifyToken' : 'passwordResetToken';
        const expiryField = emailType === 'verify' ? 'verifyTokenExpiry' : 'passwordResetTokenExpiry';

        user[tokenField] = hashedToken;
        user[expiryField] = Date.now() + 3600000; // 1 hour
        await user.save();

        const domain = process.env.DOMAIN;
        const NODEMAILER_USER = process.env.NODEMAILER_USER;
        const NODEMAILER_PASS = process.env.NODEMAILER_PASS;
        if (!domain || !NODEMAILER_USER || !NODEMAILER_PASS) {
            throw new Error('Missing environment variables for nodemailer');
        }

        const transport = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: NODEMAILER_USER,
                pass: NODEMAILER_PASS,
            },
        });

        const mailOptions = {
            from: 'abhi@gmail.com',
            to: email,
            subject: emailType === 'verify' ? 'Verify your email' : 'Reset your password',
            html: `
                <h1>${emailType === 'verify' ? 'Verify your email' : 'Reset your password'}</h1>
                <p>Click on the link below to ${emailType === 'verify' ? 'verify your email' : 'reset your password'}</p>
                <a href="${domain}/auth?emailType=${emailType}&token=${hashedToken}">
                    ${domain}/auth?emailType=${emailType}&token=${hashedToken}
                </a>
            `,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error:any) {
        throw new Error(`Failed to send email: ${error.message}`);
    }
};
