import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, FlatList, Image, TouchableNativeFeedback } from 'react-native'
import firebase from '../services/firebase'

const Logado = (props) => {

    const [users, setUsers] = useState([])
    const [state, setState] = useState([])

    useEffect(() => {
        getUserBDonline()
    },[])

    async function getUserBDonline(){
        let array = []
        setUsers(array)
        firebase.database().ref('users').orderByChild('name')
        .on('child_added', (snapshot) => {
            array.push({
                uid: snapshot.key,
                ...snapshot.val(),
            })
            setState({...state}) // refresh screen
        })
    }

    function enterChat(item){
        props.navigation.navigate('Chat', {
            contact: item,
            
        })
    }

    const renderItem = ({item, index}) => {
        if(firebase.auth().currentUser.uid != item.uid)
        return(
            <TouchableNativeFeedback
                onPress={() => enterChat(item)}>
                <View style={styles.containerUser}>
                    <Image
                        style={styles.imgIconUser}
                        source={require('../images/userIcon.png')}
                    />
                    <Text style={styles.txtName}>{item.name}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    return(
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={index => index.toString()}
            />
        </View>
    );
}

const onPressLogout = () => {
    firebase.auth().signOut()
        .then(() => props.navigation.navigate('Login'))
}

Logado.navigationOptions = screenProps => ({
    
    headerRight: () => (
        <TouchableNativeFeedback
            onPress={onPressLogout}>
            <Image
                style={{height: 25, width: 25, marginRight: 20}}
                source={require('../images/exit.png')}
            />
        </TouchableNativeFeedback>
    )
});

export default Logado

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    input: {
        borderWidth: 1,
        padding: 5,
    },

    containerUser: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderBottomWidth: 1,
        padding: 15,
    },

    txtName: {
        marginLeft: 20,
    },
    imgIconUser: {
        height: 35,
        width: 35,
    },
})