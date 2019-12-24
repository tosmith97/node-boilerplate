const User = require('./../models').User;
const validator = require('validator');

exports.createUser = async function (userInfo) {
    [err, oldUser] = await to(User.findOne({
        'email': userInfo.email
    }));
    if (oldUser) TE('User already exists with that email');
    
    //generate code for verification
    userInfo.code = Math.random().toString(36).substring(2,6);

    [err, newUser] = await to(User.create(userInfo));
    if (err) TE(err.message);

    return newUser;
}

exports.authUser = async function (userInfo) { //returns token
    if (!userInfo.password) TE('Please enter a password to login');
    let user;

    if (validator.isEmail(userInfo.email)) {
        [err, user] = await to(User.findOne({
            'email': userInfo.email
        }));
        if (err) TE(err.message, true);
    } else {
        TE('A valid email was not entered');
    }

    if (!user) TE('Not registered');
    [err, user] = await to(user.comparePassword(userInfo.password));
    if (err) TE(err.message, true);
    return user;
}

exports.resetPassword = async function (reqBody) {
    if (!reqBody.resetPasswordToken) TE('Invalid token');
    if (!reqBody.newPassword) TE('Invalid password');
    
    let err, user;
    const conditions = {
        resetPasswordToken: reqBody.resetPasswordToken,
        resetPasswordExpires: {
            $gt: Date.now()
        },
    };

    [err, user] = await to(User.findOne(conditions));

    if (!user) TE('Invalid or expired token');

    /**
     * hashed password and creation of a new refresh token 
     * handled by 'save' hook in user model
     */

    user.password = reqBody.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    [err, user] = await to(user.save());
    if (err) TE(err.message);

    return user;
}
