import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native'
import firebase from '../services/firebase'

const StartApp = (props) => {

    useEffect(() => {
        accessUser()
    },[])

    function accessUser(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                props.navigation.navigate('Logado')
            }else{
                props.navigation.navigate('Login')
            }
        })
    }

    return(
        <View style={styles.container}>
            <Image
                style={styles.imgTitle}
                source={require('../images/iconMessage.png')}
            />
            <Text style={styles.title}>App de Mensagens</Text>
            <Text style={styles.msm}>Conectando ao servidor</Text>
            <ActivityIndicator size={35} color="white" />
        </View>
    );
}

StartApp.navigationOptions = screenProps => ({
    header: null,
});

export default StartApp

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
        marginBottom: 10,
    },
    imgTitle: {
        height: 80,
        width: 80,
    },
    msm: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
    },
})