import firebaseRN from 'react-native-firebase'
import firebase from './firebase'

export async function notificationControl(uid){
    const enabled = await firebaseRN.messaging().hasPermission();
    if (enabled) {
        console.log('Permissões ok')
        getToken(uid);
    } else {
        console.log('Sem permissão, tentando permissão')
        requestPermission(uid);
    }
}

// Os tokens são utilizados para identificar o dispositivo, envaindo as notificações
function getToken(uid) {
    firebaseRN.messaging().getToken()
        .then((token) => registerTokenInFirebase(uid, token))
        .catch((error) => console.log(error))
}

// O IOs necessita de permissões para utilizar as notificações
function requestPermission(uid) {
    firebaseRN.messaging().requestPermission()
        .then((result) => getToken(uid))
        .catch((result) => console.log(result))
}

async function registerTokenInFirebase(uid, token){
    console.log('UID: '+uid)
    console.log('token: '+token)
    firebase
        .database()
        .ref("tokens")
        .child(uid)
        .update({
            token: token    
        })
        .then(() => console.log('Token registrado com sucesso'))
        .catch((error) => console.log(error.message))
}