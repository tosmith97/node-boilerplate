const authService = require('../services/AuthService');
const userService = require('../services/UserService');

exports.create = async function (req, res) {
    if (!checkProps(req.body, "email|password|birthday")) return ReE(res, 'Missing properties for endpoint', 400);
    const body = req.body;
    if (!body.email) {
        return ReE(res, 'Please enter an email to register.', 422);
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.', 422);
    } else {

    let err, user;
    [err, user] = await to(authService.createUser(body));
    if (err) {
        return ReE(res, err, 422);
    }

    const userJson = user.toWeb();
    return ReS(res, {
        userJson,
        refreshToken: user.refreshToken.token,
        token: user.getJWT(),
    }, 201);
    }
}

exports.get = async function (req, res) {
    const user = req.user;
    const userJson = user.toWeb();

    return ReS(res, {
        userJson
    });
}

exports.update = async function (req, res) {
    if (!checkProps(req.body, "update")) return ReE(res, 'Missing properties for endpoint', 400);
    const user = req.user;
    const { update } = req.body;
    let err, updatedUser;

    [err, updatedUser] = await to(userService.updateUser({_id: user.id}, update));
    if (err) return ReE(res, err, 500);

    return ReS(res, {
        userJson: updatedUser.toWeb(),
    }, 200); 
}

exports.delete = async function (req, res) {
    const user = req.user;
    let err, _;
    [err, _] = await to(userService.deleteUser(user.id));
    if (err) return ReE(res, err)
    return ReS(res, {
        message: 'User successfully deleted',
    }, 200);
}

exports.login = async function (req, res) {
    if (!checkProps(req.body, "email|password")) return ReE(res, 'Missing properties for endpoint', 400);
    let err, user;
    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 422);
    
    const userJson = user.toWeb();

    return ReS(res, {
        token: user.getJWT(),
        refreshToken: user.refreshToken.token,
        userJson
    });
}

/**
 * Refresh token for user
 */
exports.refreshUserToken = async function (req, res) {
    const user = req.user;
    let refreshToken = req.body.refreshToken;

    if (user.refreshToken.token === refreshToken) {
        return ReS(res, {
            token: user.getJWT(),
        });
    } else {
        return ReE(res, 'Invalid refresh token');
    }
}
