require('dotenv').config();
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
        from: '"VƯƠNG VĂN NAM" <vuongthanhthao2468@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html:
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
        `, // html body
    });

}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}