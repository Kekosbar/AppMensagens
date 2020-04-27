const functions = require('firebase-functions');
const admin = require('firebase-admin');
// admin.initializeApp();

exports.handler = (request, response) => {
    // Check for POST request
    if(request.method !== "POST"){
        response.status(400).send('Please send a POST request');
        return;
    }
    const auth = admin.auth()
    const db = admin.database();
    
    const { email, password, name, photo } = request.body
    
    auth.createUser({
        email: email,
        emailVerified: false,
        // phoneNumber: '+11234567890',
        password: password,
        displayName: name,
        // photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false
      })
        .then(function(userRecord) {
            db.ref('users').child(userRecord.uid).set({
                name, photo
            }).then((sucess) => {
                response.status(200).send('Usuario '+name+' cadastro com sucesso');
                return null
            }).catch((error) => {
                response.status(400).send('Usuario '+name+' cadastrou na auth mais falhou em cadastrar em users');
            })
            return null
        })
        .catch((error) => {
            response.status(400).send(error.message);
        });
}