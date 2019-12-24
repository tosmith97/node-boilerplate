const User = require('../models').User;

getUserByEmail = async function (email) {
    let err, user;
    [err, user] = await to(User.findOne({email}));
    if (err) TE("Unable to find user: " + err.message);

    return user;
}

exports.getUserById = async function(userId) {
    let err, user;
    [err, user] = await to(User.findById(userId));
    if (err) TE("Unable to find user: " + err.message);
    
    return user;
}

exports.updateUser = async function (filter, update) {
    let err, user;
    [err, user] = await to(User.findOneAndUpdate(filter, update, {new: true}));
    if (err) TE("Unable to update user: " + err.message);

    return user;
}


exports.deleteUser = async function(userId) {
    let err, _;
    [err, _] = await to(User.findByIdAndDelete(userId));
    if (err) TE("Unable to delete user: " + err.message);
}