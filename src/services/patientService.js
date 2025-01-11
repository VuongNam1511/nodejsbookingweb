import { where } from "sequelize";
import db from "../models";
import { defaults } from "lodash";
import { raw } from "body-parser";
require('dotenv').config();
import emailService from './emailService'

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing requered Parameter'
                })
            } else {

                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'Vương Văn Đông',
                    time: '08:00 - 09:00 Thứ sáu 10/1/2025',
                    doctorName: 'Nguyễn Thị Thanh Thủy',
                    redirectLink: 'https://www.facebook.com/vuongnam1511',

                })

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                });

                //Create booking record
                if (user && user[0]) {

                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }


                resolve({
                    errCode: 0,
                    errMessage: 'Save doctor infor patient succeed!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment
}