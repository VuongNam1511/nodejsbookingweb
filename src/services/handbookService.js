const { where } = require('sequelize')
const db = require('../models')

let createHandBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing requered Parameter'
                })
            } else {
                await db.HandBook.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllHandBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.HandBook.findAll({
            });
            if (data && data.length > 0) {
                data.map(item => {
                    // db lưu ở dạng binary mà html chỉ hiểu được dạng String vì vậy cần 1 hàm để convert lại 
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })

        } catch (e) {
            reject(e)
        }
    })
}

let getDetailHandBookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing requered Parameter'
                })
            } else {
                let data = await db.HandBook.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })

                if (data) {


                } else data = {}

                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createHandBook: createHandBook,
    getAllHandBook: getAllHandBook,
    getDetailHandBookById: getDetailHandBookById

}