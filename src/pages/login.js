import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native'
import firebase from '../services/firebase'
import { notificationControl } from '../services/notification'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
      }, [backButtonHandler]);
  
    function backButtonHandler() {
        if (props.navigation.isFocused()) {
            BackHandler.exitApp()
            return true;
        } else
            return false
    }

    const onPressLogin = () => {
        setLoading(true)
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                // Salvando o token para disparo de notificações
                notificationControl(result.user.uid)
                props.navigation.navigate('Logado')
            })
            .catch((error) => Alert.alert('ERRO!', error.message))
            .finally(()=>setLoading(false))
    }

    return(
        <View style={styles.container}>
            <Image
                style={styles.imgTitle}
                source={require('../images/iconMessage.png')}
            />
            <Text style={styles.title}>App de Mensagens</Text>
            <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Senha"
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <TouchableOpacity
                onPress={onPressLogin}>
                <View style={styles.buttom}>
                    {loading ? (
                        <ActivityIndicator size={25} color="#9141E0" />
                    ) : (
                        <Text style={styles.txtButtom}>LOGIN</Text>
                    )}
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
        marginBottom: 30,
    },
    label: {
        color: 'white',
        alignSelf: 'flex-start',
        fontSize: 16,
    },
    imgTitle: {
        height: 80,
        width: 80,
    },
    input: {
        borderWidth: 1,
        padding: 5,
        width: 250,
        marginBottom: 20,
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