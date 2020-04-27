const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const register = require('./functions/register')
const redirectMsm = require('./triggers/redirectMsm')

exports.register = functions.https.onRequest(register.handler)

exports.redirectMsm = redirectMsm.handler