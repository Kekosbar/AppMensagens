import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native'
import firebaseRN from 'react-native-firebase'
import firebase from '../services/firebase'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        // notificationControl()
    },[])

    const onPressLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result.user.uid)
                notificationControl(result.user.uid)
                props.navigation.navigate('Logado')
            })
            .catch((error) => Alert.alert('ERRO!', error.message))
    }

    // NOTIFICATIONS
    //==================================================================

    async function notificationControl(uid){
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
            .ref("users")
            .child(uid)
            .update({
                token: token    
            })
            .then(() => console.log('Token registrado com sucesso'))
            .catch((error) => console.log(error.message))
    }

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Senha"
                onChangeText={(text) => setPassword(text)}
            />
            <Button
                title="Login"
                onPress={onPressLogin}
            />
            <View style={{margin: 20}}></View>
            <Button
                title="Cadastro"
                onPress={() => props.navigation.navigate('Cadastro')}
            />
        </View>
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        borderWidth: 1,
        padding: 5,
        width: 250,
        marginBottom: 50,
    },
})