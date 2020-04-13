import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image, TextInput, TouchableWithoutFeedback, Buttom } from 'react-native'
import firebase from '../services/firebase'

const Chat = (props) => {

    const [msm, setMsm] = useState('')
    const [contact, setContact] = useState({})
    const [state, setState] = useState([])
    const [flatList, setFlatlist] = useState(null)
    const [messages, setMessages] = useState([
        // {msm: 'Testando a escrita de uma mensagem para mostra na tela de chat', date: '5:00'},
        // {msm: 'Testando ', date: '10:00'},
        // {msm: 'Testando a escrita de uma mensagem para ', date: '10:00'},
        // {msm: 'Testando fjasklçdf fkdaçlfdja fkdaçldf dfjdk fdf alskdjf asdlkfjçadfaskdlf fdfkj', date: '10:00'},
        // {msm: 'Testando a escrita de uma mensagem para ', date: '10:00'},

        // {msm: 'Testando a escrita de uma mensagem para mostra na tela de chat', date: '10:00'},
        // {msm: 'Testando ', date: '10:00'},
        // {msm: 'Testando a escrita de uma mensagem para ', date: '10:00'},
        // {msm: 'Testando fjasklçdf fkdaçlfdja fkdaçldf dfjdk fdf alskdjf asdlkfjçadfaskdlf fdfkj', date: '10:00'},
        // {msm: 'Testando a escrita de uma mensagem para ', date: '10:00'},

        // {msm: 'Testando a escrita de uma mensagem para mostra na tela de chat', date: '10:00'},
        // {msm: 'Testando ', date: '10:00'},
        // {msm: 'Testando a escrita de uma mensagem para ', date: '10:00'},
        // {msm: 'Testando fjasklçdf fkdaçlfdja fkdaçldf dfjdk fdf alskdjf asdlkfjçadfaskdlf fdfkj', date: '10:00'},
        // {msm: 'Testando a escrita de uma mensagem para ', date: '23:30'},
    ])

    useEffect(()=>{
        const contact = props.navigation.getParam('contact')
        setContact(contact)
        getMsmFirebase(contact)
    },[])

    function getMsmFirebase(contact){
        const uidEmitter = firebase.auth().currentUser.uid
        const uidReceptor = contact.uid
        let array = []
        const today = getDateNow()
        firebase.database().ref('messages/'+uidEmitter+'/'+uidReceptor)
        .on('child_added', (snapshot) => {
            array.unshift({
                ...snapshot.val(),
                date: convertTimestampToDate(snapshot.val().date, today)
            })
            setState({...state})
        })
        setMessages(array)
    }

    function sendMsm(msm){
        const uidEmitter = firebase.auth().currentUser.uid
        const uidReceptor = contact.uid
        firebase.database().ref('messages')
        .child(uidEmitter)
        .child(uidReceptor)
        .push({
            msm,
            owner: true,
            date: firebase.database.ServerValue.TIMESTAMP
        })
        .then(()=>console.log('Send sucess'))
        .catch((erro)=>console.log(erro))
    }

    const onPressSend = () => {
        if(msm == '') return;
        setMsm('')
        sendMsm(msm)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getDateNow() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        return { dd, mm, yyyy };
    }

    function convertTimestampToDate(timestamp, today){
        const date = new Date(timestamp)
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();
        let min = String(date.getMinutes()).padStart(2, '0');;
        let hrs = String(date.getHours()).padStart(2, '0');;

        if(today.dd == dd && today.mm == mm)
            return hrs + ':' + min
        else
            return dd + '/' + mm;
    }

    const renderItem = ({item, index}) => {
        if(item.owner)
            return(
                <View style={styles.containerMyMsm}>
                    <Text style={styles.txtMyMsm}>{item.msm}</Text>
                    <Text style={styles.txtMyData}>{item.date}</Text>
                </View>
            );
        else
            return(
                <View style={styles.containerMsm}>
                    <Text>{item.msm}</Text>
                    <Text style={styles.txtData}>{item.date}</Text>
                </View>
            );
            
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerUser}>
                <Image
                    style={styles.imgIconUser}
                    source={contact.photo != '' ? {uri: 'data:image/png;base64,' + contact.photo} : require('../images/userIcon.png')}
                />
                <Text style={styles.txtName}>{contact.name}</Text>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                <FlatList
                    style={{flex: 1, }}
                    inverted={true}
                    ref={ref => setFlatlist(ref)}
                    onContentSizeChange={() => {
                        if(messages.length > 0)
                            flatList.scrollToIndex({animated: true, index: 0})
                    }}
                    keyboardShouldPersistTaps={true}
                    data={messages}
                    renderItem={renderItem}
                />
            </View>
            <View style={styles.containerInput}>
                <TextInput
                    value={msm}
                    style={styles.input}
                    onChangeText={(text) => setMsm(text)}
                    multiline={true}
                    onTouchEndCapture={async () => {
                        await sleep(150)
                        console.log('executou')
                        flatList.scrollToIndex({animated: true, index: 0})
                    }}
                    placeholder="Digite sua mensagem.."
                />
                <TouchableWithoutFeedback
                    onPress={onPressSend}>
                    <Image
                        style={styles.iconSend}
                        source={require('../images/send.png')}
                    />
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

Chat.navigationOptions = screenProps => ({
    header: null
});

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#444148',
    },
    containerUser: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        padding: 10,
    },
    txtName: {
        color: 'white',
        marginLeft: 20,
        fontSize: 18,
    },
    imgIconUser: {
        height: 35,
        width: 35,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    containerMsm: {
        alignSelf: 'flex-start',
        backgroundColor: '#E7E7E7',
        borderRadius: 10,
        borderTopLeftRadius: 0,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 2,
        maxWidth: 250
    },
    containerMyMsm: {
        alignSelf: 'flex-end',
        backgroundColor: '#9141E0',
        borderRadius: 10,
        borderTopRightRadius: 0,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 2,
        maxWidth: 250,
    },
    txtMyMsm: {
        color: 'white'
    },
    txtData: {
        fontSize: 11,
        color: '#555555',
        alignSelf: 'flex-end'
    },
    txtMyData: {
        fontSize: 11,
        color: 'white',
        alignSelf: 'flex-end'
    },
    containerInput: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 25,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
    },
    input: {
        padding: 5,
        width: 300,
    },
    iconSend: {
        height: 20, 
        width: 30,
        right: 10,
    },
})