import React, {useEffect, useState} from 'react'
import { StyleSheet, ScrollView, View, Text, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, Image, NativeModules } from 'react-native'
import api from '../services/api'
import DialogListPhoto from '../components/dialogListPhoto'

const Cadastro = (props) => {

    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState({
        base64: '', uri: '',
    })
    const [dialogList, setDialogList] = useState({visible: false})

    useEffect(() => {
        
    },[])

    const onPressCadastro = async () => {
        if(password.length <= 5){
            Alert.alert('ERRO!', 'A senha deve conter no mínimo 6 caractêres')
            return;
        }
        setLoading(true)
        const data = {
            name, age, email, password, 
            photo: image.base64
        }
        api.post('/register', data)
            .then(() => {
                props.navigation.navigate('Login')
                Alert.alert('Sucesso!', 'Cadastrado com sucesso')
            })
            .catch(() => Alert.alert('ERRO!', 'Verifique o seus dados e tente novamente'))
            .finally(() => setLoading(false))
    }

    function usaCamera() {
        setDialogList({visible: false})
        console.log('Usa camera')
        NativeModules.Bulb.usaCamera(saveImage);
    }

    function getFotoGaleria() {
        console.log('Get foto galeria')
        setDialogList({visible: false})
        NativeModules.Bulb.getFotoGaleria(saveImage);
    }

    const saveImage = (img) => {
        const base64 = img
        const uri = {uri: 'data:image/png;base64,' + img}
        setImage({base64, uri})
    }

    return(
        <ScrollView style={styles.container}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
            <View style={styles.containerTitle}>
                <Text style={styles.txtTitle}>Cadastro</Text>
                <Image
                    style={styles.imgTitle}
                    source={require('../images/user-group-icon.png')}
                />
            </View>
            <TouchableOpacity
                onPress={() => setDialogList({visible: true, title: 'Escolha uma opção'})}>
                    <Image style={styles.imgPhoto} 
                        source={image.base64 === '' ? require('../images/photoIcon.png') : image.uri}/>
            </TouchableOpacity>
            <View>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    onChangeText={(text) => setName(text)}
                />
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
                disabled={loading}
                onPress={onPressCadastro}>
                <View style={[styles.buttom, {backgroundColor: '#9141E0'}]}>
                    {loading ? (
                        <ActivityIndicator size={25} color="white" />
                    ) : (
                        <Text style={[styles.txtButtom, {color: 'white'}]}>CADASTRO</Text>
                    )}
                </View>
            </TouchableOpacity>
            </View>

            <DialogListPhoto
                visible={dialogList.visible}
                title={dialogList.title}
                onTouchOutside={() => setDialogList({visible: false})}
                data={[
                    {key: '1', texto: 'Tirar uma foto', funcao: () => usaCamera(), imagem: require('../images/photo_camera.png')},
                    {key: '2', texto: 'Foto da galeria', funcao: () => getFotoGaleria(), imagem: require('../images/folder-24px.png')},
                ]}
            />
        </ScrollView>
    );
}

Cadastro.navigationOptions = screenProps => ({
    headerLeft: null,
});

export default Cadastro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444148'
    },
    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtTitle: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    imgTitle: {
        height: 60,
        width: 60,
        marginLeft: 20,
    },
    input: {
        borderWidth: 1,
        padding: 5,
        width: 250,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    label: {
        color: 'white',
        alignSelf: 'flex-start',
        fontSize: 16,
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
    imgPhoto: {
        backgroundColor: 'white',
        height: 100,
        width: 100,
        borderRadius: 20,
        marginBottom: 20
    },
})