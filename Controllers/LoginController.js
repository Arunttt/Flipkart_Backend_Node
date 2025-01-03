const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const LoginProcess = require('../Models/LoginProcess');
const bcrypt = require('bcrypt');

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

const sendOtpToEmail = async (mail, otp) => {
    try {
        if (!mail) {
            console.error('Email address is missing');
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'arunedaily9608@gmail.com',
                pass: 'nnqv vkwg jcja fdfo',
            },
        });

        const mailOptions = {
            from: 'arunedaily9608@gmail.com',
            to: mail,
            subject: 'Your OTP Code',
            html: `
                <html>
                    <body>
                        <p>Your OTP code is
                            <span style="font-size: 24px; color: blue; font-weight: bold;">${otp}</span>.
                            It is valid for 5 minutes.
                        </p>
                    </body>
                </html>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to email: ${mail}`);
    } catch (error) {
        console.error('Failed to send OTP email:', error);
    }
};

//-----------Register-----------------

const register = async (req, res) => {
    const { firstName, lastName, username, mail, mobileNumber, role } = req.body;

    try {

        if (role && !['User', 'Admin'].includes(role)) {
            return res.status(400).send('Invalid Role');
        }
        
        let user = await LoginProcess.findOne({ mobileNumber });

        if (user) {
            return res.status(400).send('User already registered');
        }

        const otp = generateOTP();

        user = new LoginProcess({
            firstName,
            lastName,
            username,
            mail,
            mobileNumber,
            otp,
            otpExpires: Date.now() + 300000,
            role: role || 'User',
        });

        await user.save();

        await sendOtpToEmail(mail, otp);

        const token = await user.generateAuthToken();

        
        res.status(200).json({message:'OTP sent to email. Please enter the OTP to proceed.',
            user:{
                user_id:user.user_id,
                firstName:user.firstName,
                lastName:user.lastName,
                username:user.username,
                mail:user.mail,
                mobileNumber:user.mobileNumber,
                jwtToken: token,
                role: user.role,
            }
    });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Server error');
    }
};

const verifyToken = (req,res,next) => {
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message:'Access Denied'});
    }

    try{
        const verified = jwt.verify(token,'Your_jwt_secret_key')
        req.user = verified;
        next();
    }catch(err){
        res.status(500).json({message:'Token Expire or Invalid'});
    }
}

const verifyOtpAndSetPassword = async (req, res) => {
    const { otp, mobileNumber, password } = req.body;

    try {
        let user = await LoginProcess.findOne({ mobileNumber });

        if (!user) {
            return res.status(400).send('User not found');
        }

        if (Date.now() > user.otpExpires) {
            return res.status(400).send('OTP has expired');
        }

        if (user.otp !== otp) {
            return res.status(400).send('Invalid OTP');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).send('Password set successfully');
    } catch (error) {
        console.error('Error verifying OTP and setting password:', error);
        res.status(500).send('Server error');
    }
};

//-------------Login --------------

const loginRemote = async (req,res) => {
    const {username,password} = req.body;
    try{
        let user = await LoginProcess.findOne({username});

        if(!user){
           return res.status(400).send('username is not matched');
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
           return res.status(400).send('inCorrect password');
        }

        res.status(200).json({ message: 'Login successful',
            user
        });
    }catch(error){
        res.status(500).send('Server error');
    }
};


module.exports = { register, verifyOtpAndSetPassword, loginRemote, verifyToken };
