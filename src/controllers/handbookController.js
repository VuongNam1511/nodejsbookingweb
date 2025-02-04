import handbookService from "../services/handbookService";

let createHandBook = async (req, res) => {
    try {
        let infor = await handbookService.createHandBook(req.body);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form Server'
        })
    }
}

let getAllHandBook = async (req, res) => {
    try {
        let infor = await handbookService.getAllHandBook();
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form Server'
        })
    }
}

let getDetailHandBookById = async (req, res) => {
    try {
        let infor = await handbookService.getDetailHandBookById(req.query.id);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form Server'
        })
    }
}


module.exports = {
    createHandBook: createHandBook,
    getAllHandBook: getAllHandBook,
    getDetailHandBookById: getDetailHandBookById

}