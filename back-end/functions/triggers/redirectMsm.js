const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.handler = functions.database.ref('messages/{usersId}/{recipientId}/{msmId}')
    .onCreate((snap, context) => {
        const { usersId, recipientId, msmId } = context.params
        const { msm, date, owner } = snap.val()

        if(owner){
            admin.database().ref('messages/'+recipientId+'/'+usersId)
            .push({
                msm, date,
                owner: false,
            })

            notification(usersId, recipientId, msm)
        }
    })

function notification(usersId, recipientId, msm){
    admin.auth().getUser(usersId)
    .then((user) => {
        admin.database().ref('tokens/'+recipientId+'/token')
        .once('value', (snapshot) => {
            const token = snapshot.val()

            const playLoad = {
                notification: {
                    title: user.displayName,
                    body: msm
                }
            }

            if(token !== null)
                admin.messaging().sendToDevice(token, playLoad)
        })
        .catch((erro) => {
            console.log(erro)
        })
        return null
    })
    .catch((erro) => {
        console.log(erro)
    })
    
}