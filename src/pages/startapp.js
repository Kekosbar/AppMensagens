import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
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
            
        </View>
    );
}

export default StartApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        borderWidth: 1,
        padding: 5,
    },
})