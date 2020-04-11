import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, TouchableOpacity } from 'react-native'
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
            <Image
                style={styles.imgTitle}
                source={require('../images/iconMessage.png')}
            />
            <Text style={styles.title}>App de Mensagens</Text>
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
            <TouchableOpacity
                onPress={onPressLogin}>
                <View style={styles.buttom}>
                    <Text style={styles.txtButtom}>LOGIN</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Cadastro')}>
                <View style={[styles.buttom, {backgroundColor: '#9141E0'}]}>
                    <Text style={[styles.txtButtom, {color: 'white'}]}>CADASTRO</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

Login.navigationOptions = screenProps => ({
    header: null
});

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#444148'
    },
    title: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 25,
        fontFamily: 'sans-serif-light',
        marginBottom: 50,
    },
    imgTitle: {
        height: 80,
        width: 80,
    },
    input: {
        borderWidth: 1,
        padding: 5,
        width: 250,
        marginBottom: 40,
        borderRadius: 10,
        backgroundColor: 'white',
        fontSize: 14,
    },
    buttom: {
        width: 200,
        borderWidth: 4,
        borderColor: '#9141E0',
        padding: 10,
        alignItems: 'center',
        margin: 20,
    },
    txtButtom: {
        color: '#9141E0',
        fontWeight: 'bold',
        fontSize: 18,
    },
})