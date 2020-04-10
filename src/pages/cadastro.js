import React, {useEffect, useState} from 'react'
import { StyleSheet, ScrollView, View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native'
import api from '../services/api'

const Cadastro = (props) => {

    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // notificationControl()
    },[])

    const onPressCadastro = async () => {
        setLoading(true)
        const data = {
            name, age, email, password
        }
        api.post('/register', data)
            .then(() => Alert.alert('Sucesso!', 'Cadastrado com sucesso'))
            .catch(() => Alert.alert('ERRO!', 'Falha ao cadastrar o usuário'))
            .finally(() => setLoading(false))
    }

    // NOTIFICATIONS
    //==================================================================

    return(
        <ScrollView>
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder="Age"
                onChangeText={(text) => setAge(text)}
            />
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
            {loading ? (
                <ActivityIndicator size={25} color="black" />
            ) : (
                <View style={{margin: 25}}></View>
            )}
            <Button
                title="Cadastro"
                onPress={onPressCadastro}
            />
        </View>
        </ScrollView>
    );
}

export default Cadastro

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