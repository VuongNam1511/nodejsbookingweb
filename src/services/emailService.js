require('dotenv').config();
import { result } from 'lodash';
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"VVN Booking Web App" <vuongthanhthao2468@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });

}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Kính gửi ${dataSend.patientName}!</h3>
        <p>Cảm ơn bạn đã đăng ký khám tại trang web của chúng tôi. Chúng tôi rất hân hạnh được phục vụ bạn.</p>
        <p>Dưới đây là thông tin đặt lịch khám bệnh của bạn:</p>
        <div><b>Họ và tên: ${dataSend.patientName}</b></div>
        <div><b>Thời gian khám: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu thông tin trên đã đúng, vui lòng Click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh cho bạn nhé!</p>
        <div><a href=${dataSend.redirectLink} target="blank">Click here</a></div>
        <div>Xin chân thành cảm ơn </div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>Thank you for registering for an examination on our website. We are very pleased to serve you.</p>
        <p>Here is your appointment information: </p>
        <div><b>Full name: ${dataSend.patientName}</b></div>
        <div><b>Examination time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is correct, please click on the link below to confirm and complete the appointment procedure for you!</p>
        <div><a href=${dataSend.redirectLink} target="blank">Click here</a></div>
        <div>Sincerely thank you </div>
        `
    }

    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}