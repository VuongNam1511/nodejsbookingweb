
import userService from "../services/userService";

let HandleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    console.log(userData)
    // check email exist
    // compare password
    // return userInfor
    // access_token: JWT Json web token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let HandleGetAllUsers = async (req, res) => {
    let id = req.query.id; //All, id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing Paramerter Required',
            users: []
        })

    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let HandleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message)
}

let HandleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}

let HandleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

module.exports = {
    HandleLogin: HandleLogin,
    HandleGetAllUsers: HandleGetAllUsers,
    HandleCreateNewUser: HandleCreateNewUser,
    HandleEditUser: HandleEditUser,
    HandleDeleteUser: HandleDeleteUser,
}