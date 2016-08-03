/**
 * Created by Admin on 5/15/16.
 */
var sendgrid = require('sendgrid')(process.env.SENDGRID_KEY || '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');

exports.sendVerify = (user, cb) => {
    console.log('USER', user)
    var html = `<p>Thanks ${user.username}, for signing up for Flea-Bay!/a> <p>Please login now to create an auction!</p>`;

    sendgrid.send({
        to: user.email,
        from: 'authapp@whatever.com',
        subject: 'List your first item on Flea-Bay!',
        html: html
    }, cb);
};